from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class Work(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class WorkCreate(BaseModel):
    title: str
    description: str = ""

class WorkUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


class Race(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    work_id: str
    name: str
    description: str = ""
    template_fields: List[Dict[str, Any]] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class RaceCreate(BaseModel):
    name: str
    description: str = ""
    template_fields: List[Dict[str, Any]] = Field(default_factory=list)

class RaceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    template_fields: Optional[List[Dict[str, Any]]] = None


class Character(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    work_id: str
    race_id: Optional[str] = None
    name: str
    age: Optional[int] = None
    character_type: str = "secundario"  # protagonista, antagonista, secundario, NPC
    image_url: Optional[str] = None
    custom_fields: Dict[str, Any] = Field(default_factory=dict)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CharacterCreate(BaseModel):
    name: str
    race_id: Optional[str] = None
    age: Optional[int] = None
    character_type: str = "secundario"
    image_url: Optional[str] = None
    custom_fields: Dict[str, Any] = Field(default_factory=dict)

class CharacterUpdate(BaseModel):
    name: Optional[str] = None
    race_id: Optional[str] = None
    age: Optional[int] = None
    character_type: Optional[str] = None
    image_url: Optional[str] = None
    custom_fields: Optional[Dict[str, Any]] = None


# Works endpoints
@api_router.get("/works", response_model=List[Work])
async def get_works():
    works = await db.works.find({}, {"_id": 0}).to_list(1000)
    for work in works:
        if isinstance(work['created_at'], str):
            work['created_at'] = datetime.fromisoformat(work['created_at'])
    return works

@api_router.post("/works", response_model=Work)
async def create_work(input: WorkCreate):
    work_obj = Work(**input.model_dump())
    doc = work_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.works.insert_one(doc)
    return work_obj

@api_router.get("/works/{work_id}", response_model=Work)
async def get_work(work_id: str):
    work = await db.works.find_one({"id": work_id}, {"_id": 0})
    if not work:
        raise HTTPException(status_code=404, detail="Work not found")
    if isinstance(work['created_at'], str):
        work['created_at'] = datetime.fromisoformat(work['created_at'])
    return work

@api_router.put("/works/{work_id}", response_model=Work)
async def update_work(work_id: str, input: WorkUpdate):
    existing_work = await db.works.find_one({"id": work_id}, {"_id": 0})
    if not existing_work:
        raise HTTPException(status_code=404, detail="Work not found")
    
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    if update_data:
        await db.works.update_one({"id": work_id}, {"$set": update_data})
    
    updated_work = await db.works.find_one({"id": work_id}, {"_id": 0})
    if isinstance(updated_work['created_at'], str):
        updated_work['created_at'] = datetime.fromisoformat(updated_work['created_at'])
    return updated_work

@api_router.delete("/works/{work_id}")
async def delete_work(work_id: str):
    result = await db.works.delete_one({"id": work_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Work not found")
    
    # Delete associated races and characters
    await db.races.delete_many({"work_id": work_id})
    await db.characters.delete_many({"work_id": work_id})
    
    return {"message": "Work deleted successfully"}


# Races endpoints
@api_router.get("/works/{work_id}/races", response_model=List[Race])
async def get_races(work_id: str):
    races = await db.races.find({"work_id": work_id}, {"_id": 0}).to_list(1000)
    for race in races:
        if isinstance(race['created_at'], str):
            race['created_at'] = datetime.fromisoformat(race['created_at'])
    return races

@api_router.post("/works/{work_id}/races", response_model=Race)
async def create_race(work_id: str, input: RaceCreate):
    # Check if work exists
    work = await db.works.find_one({"id": work_id})
    if not work:
        raise HTTPException(status_code=404, detail="Work not found")
    
    race_dict = input.model_dump()
    race_dict['work_id'] = work_id
    race_obj = Race(**race_dict)
    
    doc = race_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.races.insert_one(doc)
    return race_obj

@api_router.get("/races/{race_id}", response_model=Race)
async def get_race(race_id: str):
    race = await db.races.find_one({"id": race_id}, {"_id": 0})
    if not race:
        raise HTTPException(status_code=404, detail="Race not found")
    if isinstance(race['created_at'], str):
        race['created_at'] = datetime.fromisoformat(race['created_at'])
    return race

@api_router.put("/races/{race_id}", response_model=Race)
async def update_race(race_id: str, input: RaceUpdate):
    existing_race = await db.races.find_one({"id": race_id}, {"_id": 0})
    if not existing_race:
        raise HTTPException(status_code=404, detail="Race not found")
    
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    if update_data:
        await db.races.update_one({"id": race_id}, {"$set": update_data})
    
    updated_race = await db.races.find_one({"id": race_id}, {"_id": 0})
    if isinstance(updated_race['created_at'], str):
        updated_race['created_at'] = datetime.fromisoformat(updated_race['created_at'])
    return updated_race

@api_router.delete("/races/{race_id}")
async def delete_race(race_id: str):
    result = await db.races.delete_one({"id": race_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Race not found")
    return {"message": "Race deleted successfully"}


# Characters endpoints
@api_router.get("/works/{work_id}/characters", response_model=List[Character])
async def get_characters(work_id: str):
    characters = await db.characters.find({"work_id": work_id}, {"_id": 0}).to_list(1000)
    for character in characters:
        if isinstance(character['created_at'], str):
            character['created_at'] = datetime.fromisoformat(character['created_at'])
    return characters

@api_router.post("/works/{work_id}/characters", response_model=Character)
async def create_character(work_id: str, input: CharacterCreate):
    # Check if work exists
    work = await db.works.find_one({"id": work_id})
    if not work:
        raise HTTPException(status_code=404, detail="Work not found")
    
    character_dict = input.model_dump()
    character_dict['work_id'] = work_id
    character_obj = Character(**character_dict)
    
    doc = character_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.characters.insert_one(doc)
    return character_obj

@api_router.get("/characters/{character_id}", response_model=Character)
async def get_character(character_id: str):
    character = await db.characters.find_one({"id": character_id}, {"_id": 0})
    if not character:
        raise HTTPException(status_code=404, detail="Character not found")
    if isinstance(character['created_at'], str):
        character['created_at'] = datetime.fromisoformat(character['created_at'])
    return character

@api_router.put("/characters/{character_id}", response_model=Character)
async def update_character(character_id: str, input: CharacterUpdate):
    existing_character = await db.characters.find_one({"id": character_id}, {"_id": 0})
    if not existing_character:
        raise HTTPException(status_code=404, detail="Character not found")
    
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    if update_data:
        await db.characters.update_one({"id": character_id}, {"$set": update_data})
    
    updated_character = await db.characters.find_one({"id": character_id}, {"_id": 0})
    if isinstance(updated_character['created_at'], str):
        updated_character['created_at'] = datetime.fromisoformat(updated_character['created_at'])
    return updated_character

@api_router.delete("/characters/{character_id}")
async def delete_character(character_id: str):
    result = await db.characters.delete_one({"id": character_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Character not found")
    return {"message": "Character deleted successfully"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()