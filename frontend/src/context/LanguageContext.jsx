import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  es: {
    // Dashboard
    appTitle: 'Character Architect',
    appSubtitle: 'Construye mundos y personajes complejos para tus historias',
    createWork: 'Crear Obra',
    newWork: 'Nueva Obra',
    emptyWorks: 'Comienza un nuevo universo',
    emptyWorksDesc: 'Una obra agrupa tus razas y personajes. Crea tu primera obra para empezar a dar vida a tu mundo.',
    races: 'razas',
    characters: 'personajes',
    
    // Work Detail
    backToDashboard: 'Volver al dashboard',
    charactersTab: 'Personajes',
    racesTab: 'Razas',
    newCharacter: 'Nuevo Personaje',
    newRace: 'Nueva Raza',
    emptyCharacters: 'Da vida a tu elenco',
    emptyCharactersDesc: 'Crea personajes usando templates de raza o define atributos personalizados. Cada personaje puede tener su propia historia.',
    emptyRaces: 'Define especies o linajes',
    emptyRacesDesc: 'Crea razas con atributos personalizados usando templates JSON. Los personajes pueden heredar estos atributos.',
    
    // Forms
    title: 'Título',
    description: 'Descripción',
    name: 'Nombre',
    age: 'Edad',
    type: 'Tipo',
    race: 'Raza',
    image: 'Imagen del Personaje',
    uploadImage: 'Sube una imagen',
    generateAI: 'Generar con IA (próximamente)',
    save: 'Guardar',
    cancel: 'Cancelar',
    create: 'Crear',
    update: 'Actualizar',
    edit: 'Editar',
    delete: 'Eliminar',
    
    // Character Types
    protagonist: 'Protagonista',
    antagonist: 'Antagonista',
    secondary: 'Secundario',
    npc: 'NPC',
    
    // Work Form
    createWorkTitle: 'Crear Nueva Obra',
    createWorkDesc: 'Una obra agrupa tus razas y personajes en un universo único.',
    workTitlePlaceholder: 'Ej: El Señor de los Anillos',
    workDescPlaceholder: 'Describe brevemente tu obra...',
    
    // Race Form
    createRaceTitle: 'Nueva Raza',
    editRaceTitle: 'Editar Raza',
    createRaceDesc: 'Define especies o linajes con atributos personalizados en formato JSON.',
    raceNamePlaceholder: 'Ej: Elfo',
    raceDescPlaceholder: 'Describe la raza...',
    templateFields: 'Template de Campos (JSON)',
    templateExample: 'Ejemplo:',
    
    // Character Form
    createCharacterTitle: 'Nuevo Personaje',
    editCharacterTitle: 'Editar Personaje',
    createCharacterDesc: 'Crea un personaje usando un template de raza o define atributos personalizados.',
    characterNamePlaceholder: 'Ej: Aragorn',
    agePlaceholder: 'Ej: 87',
    noneCustom: 'Ninguna / Personalizado',
    attributesOf: 'Atributos de',
    
    // Character Profile
    backToWork: 'Volver a la obra',
    attributes: 'Atributos',
    viewAllAttributes: 'Ver todos los atributos',
    aboutRace: 'Sobre la raza:',
    availableFields: 'Campos disponibles en esta raza:',
    noDescription: 'Sin descripción',
    ageNotSpecified: 'Edad no especificada',
    yearsOld: 'años',
    custom: 'Personalizado',
    
    // Table
    nameColumn: 'Nombre',
    descriptionColumn: 'Descripción',
    fieldsColumn: 'Campos',
    actionsColumn: 'Acciones',
    fields: 'campos',
    
    // Delete Dialog
    deleteConfirmTitle: '¿Estás seguro?',
    deleteWorkDesc: 'Estás a punto de eliminar la obra',
    deleteRaceDesc: 'Estás a punto de eliminar la raza',
    deleteCharacterDesc: 'Estás a punto de eliminar el personaje',
    deleteWarning: 'Esta acción no se puede deshacer.',
    
    // Toasts
    workCreated: 'Obra creada exitosamente',
    workUpdated: 'Obra actualizada exitosamente',
    workDeleted: 'Obra eliminada exitosamente',
    raceCreated: 'Raza creada exitosamente',
    raceUpdated: 'Raza actualizada exitosamente',
    raceDeleted: 'Raza eliminada exitosamente',
    characterCreated: 'Personaje creado exitosamente',
    characterUpdated: 'Personaje actualizado exitosamente',
    characterDeleted: 'Personaje eliminado exitosamente',
    errorLoading: 'Error al cargar los datos',
    errorSaving: 'Error al guardar',
    errorDeleting: 'Error al eliminar',
    invalidJSON: 'Error: El JSON de template no es válido',
    
    // Misc
    loading: 'Cargando...',
    notFound: 'No encontrado',
  },
  en: {
    // Dashboard
    appTitle: 'Character Architect',
    appSubtitle: 'Build complex worlds and characters for your stories',
    createWork: 'Create Work',
    newWork: 'New Work',
    emptyWorks: 'Start a new universe',
    emptyWorksDesc: 'A work groups your races and characters. Create your first work to start bringing your world to life.',
    races: 'races',
    characters: 'characters',
    
    // Work Detail
    backToDashboard: 'Back to dashboard',
    charactersTab: 'Characters',
    racesTab: 'Races',
    newCharacter: 'New Character',
    newRace: 'New Race',
    emptyCharacters: 'Bring your cast to life',
    emptyCharactersDesc: 'Create characters using race templates or define custom attributes. Each character can have their own story.',
    emptyRaces: 'Define species or lineages',
    emptyRacesDesc: 'Create races with custom attributes using JSON templates. Characters can inherit these attributes.',
    
    // Forms
    title: 'Title',
    description: 'Description',
    name: 'Name',
    age: 'Age',
    type: 'Type',
    race: 'Race',
    image: 'Character Image',
    uploadImage: 'Upload an image',
    generateAI: 'Generate with AI (coming soon)',
    save: 'Save',
    cancel: 'Cancel',
    create: 'Create',
    update: 'Update',
    edit: 'Edit',
    delete: 'Delete',
    
    // Character Types
    protagonist: 'Protagonist',
    antagonist: 'Antagonist',
    secondary: 'Secondary',
    npc: 'NPC',
    
    // Work Form
    createWorkTitle: 'Create New Work',
    createWorkDesc: 'A work groups your races and characters in a unique universe.',
    workTitlePlaceholder: 'E.g: The Lord of the Rings',
    workDescPlaceholder: 'Briefly describe your work...',
    
    // Race Form
    createRaceTitle: 'New Race',
    editRaceTitle: 'Edit Race',
    createRaceDesc: 'Define species or lineages with custom attributes in JSON format.',
    raceNamePlaceholder: 'E.g: Elf',
    raceDescPlaceholder: 'Describe the race...',
    templateFields: 'Field Template (JSON)',
    templateExample: 'Example:',
    
    // Character Form
    createCharacterTitle: 'New Character',
    editCharacterTitle: 'Edit Character',
    createCharacterDesc: 'Create a character using a race template or define custom attributes.',
    characterNamePlaceholder: 'E.g: Aragorn',
    agePlaceholder: 'E.g: 87',
    noneCustom: 'None / Custom',
    attributesOf: 'Attributes of',
    
    // Character Profile
    backToWork: 'Back to work',
    attributes: 'Attributes',
    viewAllAttributes: 'View all attributes',
    aboutRace: 'About race:',
    availableFields: 'Available fields in this race:',
    noDescription: 'No description',
    ageNotSpecified: 'Age not specified',
    yearsOld: 'years old',
    custom: 'Custom',
    
    // Table
    nameColumn: 'Name',
    descriptionColumn: 'Description',
    fieldsColumn: 'Fields',
    actionsColumn: 'Actions',
    fields: 'fields',
    
    // Delete Dialog
    deleteConfirmTitle: 'Are you sure?',
    deleteWorkDesc: 'You are about to delete the work',
    deleteRaceDesc: 'You are about to delete the race',
    deleteCharacterDesc: 'You are about to delete the character',
    deleteWarning: 'This action cannot be undone.',
    
    // Toasts
    workCreated: 'Work created successfully',
    workUpdated: 'Work updated successfully',
    workDeleted: 'Work deleted successfully',
    raceCreated: 'Race created successfully',
    raceUpdated: 'Race updated successfully',
    raceDeleted: 'Race deleted successfully',
    characterCreated: 'Character created successfully',
    characterUpdated: 'Character updated successfully',
    characterDeleted: 'Character deleted successfully',
    errorLoading: 'Error loading data',
    errorSaving: 'Error saving',
    errorDeleting: 'Error deleting',
    invalidJSON: 'Error: Invalid JSON template',
    
    // Misc
    loading: 'Loading...',
    notFound: 'Not found',
  }
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'es';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};