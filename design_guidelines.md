{
  "meta": {
    "app_name": "Character Architect",
    "summary": "A modern, writer-first workspace to architect worlds: manage Works, build Race templates (JSON-based), and create Characters with conditional attributes.",
    "audience": ["novelists", "screenwriters", "RPG worldbuilders", "narrative designers"],
    "brand_attributes": ["clarity", "literary", "structured", "calm", "powerful"],
    "style_fusion": "Editorial minimalism (Spectral serif headings) + functional dashboard (Figtree/Space Grotesk) + subtle parchment-inspired neutrals with an ocean-ink accent.",
    "success_actions": [
      "Create a Work, add Races with JSON templates, create Characters using templates",
      "View and edit character profiles with custom attributes",
      "Confidently manage many entities with low cognitive load"
    ]
  },

  "typography": {
    "font_pairing": {
      "heading": "Spectral",
      "ui_accent": "Space Grotesk",
      "body": "Figtree"
    },
    "google_fonts_import": "https://fonts.googleapis.com/css2?family=Spectral:wght@400;600;700&family=Space+Grotesk:wght@400;500;700&family=Figtree:wght@400;500;600;700&display=swap",
    "tailwind_setup": {
      "css_snippet": ":root { --font-heading: 'Spectral', serif; --font-ui: 'Space Grotesk', ui-sans-serif; --font-body: 'Figtree', system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'; } body { font-family: var(--font-body); } .font-heading{ font-family: var(--font-heading); } .font-ui{ font-family: var(--font-ui); }"
    },
    "text_scale": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-heading tracking-tight",
      "h2": "text-base md:text-lg font-ui font-medium tracking-[-0.01em]",
      "body": "text-sm md:text-base leading-7",
      "small": "text-xs leading-5 text-muted-foreground"
    },
    "usage_notes": [
      "Use Spectral only for high-level titles and section headers to preserve the literary tone.",
      "Use Space Grotesk for labels, numbers, chips and UI density moments (tables, filters).",
      "Keep generous line-height for long-form descriptions (leading-7/8)."
    ]
  },

  "color_system": {
    "tokens_hsl": {
      "--background": "40 22% 98%",         
      "--foreground": "220 22% 10%",        
      "--card": "0 0% 100%",
      "--card-foreground": "220 22% 10%",
      "--popover": "0 0% 100%",
      "--popover-foreground": "220 22% 10%",
      "--primary": "205 85% 30%",           
      "--primary-foreground": "0 0% 100%",
      "--secondary": "40 12% 94%",          
      "--secondary-foreground": "220 22% 20%",
      "--muted": "40 12% 94%",
      "--muted-foreground": "220 10% 40%",
      "--accent": "160 28% 88%",            
      "--accent-foreground": "205 85% 20%",
      "--destructive": "4 72% 48%",
      "--destructive-foreground": "0 0% 100%",
      "--border": "28 16% 86%",             
      "--input": "28 16% 86%",
      "--ring": "205 85% 30%",
      "--chart-1": "205 85% 36%",
      "--chart-2": "160 36% 42%",
      "--chart-3": "28 50% 46%",
      "--chart-4": "12 55% 60%",
      "--chart-5": "45 70% 50%",
      "--radius": "0.75rem"
    },
    "dark_tokens_overrides": {
      "--background": "220 15% 7%",
      "--foreground": "40 12% 96%",
      "--card": "220 15% 9%",
      "--card-foreground": "40 12% 96%",
      "--secondary": "220 14% 14%",
      "--muted": "220 14% 14%",
      "--muted-foreground": "220 10% 60%",
      "--accent": "205 24% 18%",
      "--accent-foreground": "40 12% 96%",
      "--border": "220 16% 18%",
      "--input": "220 16% 18%",
      "--ring": "205 85% 52%"
    },
    "notes": [
      "Primary (ocean ink) balances well with parchment neutrals.",
      "Accent (sage) used for chips, info states, and selection backgrounds.",
      "Ensure WCAG AA on all text—prefer foreground on card/background and avoid medium contrast text over colored surfaces."
    ]
  },

  "gradients_and_texture": {
    "allowed_sections": ["hero_header_strip", "decorative_section_bg", "empty_states_illustrative_panel"],
    "tokens": {
      "--gradient-hero": "linear-gradient(120deg, hsl(160 28% 88% / 0.6) 0%, hsl(205 85% 30% / 0.08) 40%, hsl(40 22% 98% / 0) 100%)",
      "--gradient-accent": "linear-gradient(180deg, hsl(160 28% 88% / 0.6), hsl(40 12% 94% / 0.8))"
    },
    "noise_css": "background-image: var(--gradient-hero), radial-gradient(100% 100% at 0 0, rgba(0,0,0,0.04), rgba(0,0,0,0) 40%), url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"140\" height=\"140\" viewBox=\"0 0 140 140\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.03\"/></svg>');",
    "enforcement": "Do not exceed 20% viewport coverage with gradients; never apply over text-heavy areas; never use purple/pink saturated combos; use solid colors fallback when readability risk is detected."
  },

  "layout_and_grids": {
    "container": "mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]",
    "grid_tokens": {
      "dashboard": "grid grid-cols-1 lg:grid-cols-12 gap-6",
      "work_detail": "grid grid-cols-1 lg:grid-cols-12 gap-6",
      "two_pane": "grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-6"
    },
    "page_patterns": {
      "dashboard_works_list": {
        "hero": "top strip with mild gradient background (max 20% viewport) containing H1 and CTA button",
        "content": "responsive cards grid for Works; each card shows title, description snippet, counts of races/characters; primary CTA to open work"
      },
      "work_detail": {
        "layout": "split: left sticky sidebar with Tabs (Races, Characters, Settings); right main canvas shows table or editor",
        "sidebar": "use Tabs + Nav list; include a Work metadata Card and quick actions",
        "main_canvas": "Characters and Races managed via DataTable; creation via Drawer/Sheet to keep context"
      },
      "character_form": {
        "pattern": "step-lite form inside Drawer/Dialog; when race is selected, dynamically render race template fields; if custom, allow freeform attributes table",
        "preview": "right-side live preview pane with avatar/image placeholder and key stats"
      },
      "character_profile": {
        "layout": "two-column on desktop; top summary card; below: accordion sections for Attributes, Biography, Relationships",
        "image": "upload area with image cropper placeholder; reserve space for future AI generate action"
      }
    }
  },

  "components": {
    "use_from_shadcn": {
      "button": "./components/ui/button",
      "card": "./components/ui/card",
      "tabs": "./components/ui/tabs",
      "table": "./components/ui/table",
      "form": "./components/ui/form",
      "input": "./components/ui/input",
      "textarea": "./components/ui/textarea",
      "select": "./components/ui/select",
      "dialog": "./components/ui/dialog",
      "sheet": "./components/ui/sheet",
      "popover": "./components/ui/popover",
      "calendar": "./components/ui/calendar",
      "badge": "./components/ui/badge",
      "separator": "./components/ui/separator",
      "dropdown_menu": "./components/ui/dropdown-menu",
      "hover_card": "./components/ui/hover-card",
      "tooltip": "./components/ui/tooltip",
      "scroll_area": "./components/ui/scroll-area",
      "skeleton": "./components/ui/skeleton",
      "sonner": "./components/ui/sonner"
    },
    "custom_components_to_create": [
      {
        "name": "SidebarNav",
        "path": "./components/SidebarNav.jsx",
        "export": "named",
        "purpose": "Left navigation with Tabs for Races/Characters and Work info",
        "class": "hidden lg:block lg:sticky lg:top-20"
      },
      {
        "name": "DynamicFieldRenderer",
        "path": "./components/DynamicFieldRenderer.jsx",
        "export": "named",
        "purpose": "Render fields from Race JSON template; supports types: text, textarea, number, select, multiselect, date, boolean",
        "notes": "Uses shadcn Form primitives and maintains data-testid for each field"
      },
      {
        "name": "JsonTemplateEditor",
        "path": "./components/JsonTemplateEditor.jsx",
        "export": "named",
        "purpose": "Editor for Race template JSON with validation (AJV) and helpful examples",
        "notes": "Monaco optional; fallback to textarea with code styles"
      },
      {
        "name": "CharacterCard",
        "path": "./components/CharacterCard.jsx",
        "export": "named",
        "purpose": "Compact display of character portrait, name, race, and key stats; used in grid or list",
        "class": "group relative transition-[background-color,box-shadow] duration-200 hover:shadow-sm"
      },
      {
        "name": "DataEmptyState",
        "path": "./components/DataEmptyState.jsx",
        "export": "named",
        "purpose": "Illustrative empty state with CTA and guidelines",
        "class": "text-center px-6 py-12"
      }
    ]
  },

  "buttons": {
    "style": "Professional / Corporate",
    "tokens": {
      "--btn-radius": "0.625rem",
      "--btn-shadow": "0 1px 2px hsl(220 10% 10% / 0.08)",
      "--btn-motion": "transition-colors duration-200"
    },
    "variants": {
      "primary": "bg-primary text-primary-foreground hover:bg-[hsl(205_85%_26%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[hsl(205_85%_30%)]",
      "secondary": "bg-secondary text-secondary-foreground hover:bg-[hsl(40_12%_92%)]",
      "ghost": "hover:bg-muted text-foreground",
      "destructive": "bg-destructive text-destructive-foreground hover:bg-[hsl(4_72%_42%)]"
    },
    "sizes": {
      "sm": "h-9 px-3 rounded-[var(--btn-radius)]",
      "md": "h-10 px-4 rounded-[var(--btn-radius)]",
      "lg": "h-11 px-6 rounded-[var(--btn-radius)]"
    },
    "testid_examples": [
      "data-testid=\"create-work-button\"",
      "data-testid=\"add-race-button\"",
      "data-testid=\"save-character-button\""
    ]
  },

  "navigation": {
    "topbar": "sticky top-0 z-40 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60",
    "breadcrumbs": "use ./components/ui/breadcrumb for Work > Races/Characters context",
    "sidebar": "Left sticky, collapsible on mobile via Sheet"
  },

  "page_blueprints": {
    "dashboard": {
      "header": {
        "classes": "bg-[length:100%] border-b",
        "decor": "apply --gradient-hero as background, keep text on solid surface"
      },
      "content": [
        {
          "type": "metrics_strip",
          "components": ["card", "separator"],
          "note": "Optional: word-count across works, characters, races"
        },
        {
          "type": "works_grid",
          "grid": "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6",
          "card_content": ["title", "description", "meta counts"]
        }
      ]
    },
    "work_detail": {
      "grid": "grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-6",
      "left": "SidebarNav with Tabs: Races | Characters | Settings",
      "right": "Table with filters and actions; creation via Sheet/Dialog"
    },
    "character_form": {
      "container": "lg:grid lg:grid-cols-2 gap-6",
      "left": "Form fields: baseline (name, age, type, race, image upload)",
      "right": "Live Preview: CharacterCard + attributes list; image uploader placeholder"
    },
    "character_profile": {
      "top": "Summary Card with avatar, core facts, quick actions",
      "below": "Accordion: Attributes (dynamic), Biography (rich text/textarea), Relationships (table or list)"
    }
  },

  "dynamic_forms": {
    "race_template_format": "JSON describing fields: [{ key, label, type, required, options, help, default }]. Types: text, textarea, number, select, multiselect, boolean, date",
    "conditional_logic": "If race selected: fetch its template and render fields; else show Free Attributes editor (key/value with type)",
    "renderer_pseudocode": "function renderField(f){ switch(f.type){ case 'text': return <Input .../>; case 'textarea': return <Textarea .../>; case 'number': return <Input type='number' .../>; case 'select': return <Select>...</Select>; case 'multiselect': return <Select multiple>...</Select>; case 'boolean': return <Switch/>; case 'date': return <Popover><Calendar/></Popover>; } }",
    "validation": "Use AJV to validate JSON template structure; use zod/react-hook-form to validate form inputs",
    "data_testid_rule": "Every interactive field must include data-testid using kebab-case based on field key, e.g., data-testid=\"character-field-age-input\""
  },

  "accessibility": {
    "contrast": "Meet WCAG AA; avoid colored text on gradient; use tokens to ensure contrast",
    "focus": "Always visible focus states (ring and offset). Do not remove outlines.",
    "reduced_motion": "Respect prefers-reduced-motion: provide non-animated fallbacks",
    "aria": "Label uploads, dialogs, and dynamic sections; announce template field changes"
  },

  "micro_interactions_and_motion": {
    "library": "framer-motion",
    "principles": [
      "Subtle elevation on hover for Cards (shadow-sm) and slight bg tint",
      "No universal transition: only colors/shadows/opacity; exclude transform unless needed",
      "Entrance: fade+rise 12px for cards/lists; stagger 40ms",
      "Parallax: hero decorative only, not content"
    ],
    "examples": {
      "card_hover": "transition-[background-color,box-shadow] duration-200 hover:bg-secondary hover:shadow-sm",
      "button_hover": "transition-colors duration-200",
      "table_row_hover": "hover:bg-muted/60"
    }
  },

  "data_display": {
    "tables": {
      "usage": "Use ./components/ui/table for Races and Characters; add toolbar with filters (Select, Input) and bulk actions",
      "row_testids": "data-testid=\"character-row-<id>\""
    },
    "cards": {
      "usage": "Use Card for works and summaries; place metadata chips using Badge"
    }
  },

  "forms_and_inputs": {
    "base_fields": [
      "Work: title (required), description",
      "Race: name (required), template JSON (validated)",
      "Character: name (required), age, type, race select, image upload, dynamic attributes"
    ],
    "image_upload": {
      "ui": "Card with dashed border dropzone, preview thumbnail, replace/remove buttons",
      "testid": "data-testid=\"character-image-upload\"",
      "note": "Reserve a secondary ghost button for future AI Generate action"
    },
    "calendar_usage": "Use ./components/ui/calendar within Popover for date fields"
  },

  "icons": {
    "library": "lucide-react",
    "rule": "Do not use emoji icons. Use lucide icons for actions (Plus, Edit, Upload, Image)"
  },

  "toast_and_feedback": {
    "library": "sonner",
    "paths": "./components/ui/sonner",
    "pattern": "On save/create/delete, show toast. Include data-testid like data-testid=\"toast-character-saved\""
  },

  "responsive_rules": {
    "mobile_first": true,
    "patterns": [
      "Single-column flow on mobile; actions grouped into bottom Sheet when needed",
      "Sticky top bar; sidebar collapses into Sheet",
      "Tables become Cards lists with key metadata"
    ]
  },

  "testing_attributes": {
    "rule": "All interactive and key informational elements MUST include data-testid using kebab-case and role-based naming",
    "examples": [
      "data-testid=\"works-grid\"",
      "data-testid=\"work-card\"",
      "data-testid=\"race-template-json-textarea\"",
      "data-testid=\"character-form\"",
      "data-testid=\"character-field-<key>-input\"",
      "data-testid=\"character-profile-attributes-section\""
    ]
  },

  "libraries_and_install": {
    "packages": [
      "framer-motion",
      "ajv",
      "monaco-editor",
      "react-monaco-editor",
      "react-hook-form",
      "zod"
    ],
    "install_commands": [
      "npm i framer-motion ajv",
      "npm i monaco-editor react-monaco-editor",
      "npm i react-hook-form zod"
    ]
  },

  "js_scaffolds": {
    "DynamicFieldRenderer.jsx": "export const DynamicFieldRenderer = ({ fields = [], control, errors }) => { /* render mapped fields with shadcn components; include data-testid per field */ return null }",
    "JsonTemplateEditor.jsx": "export const JsonTemplateEditor = ({ value, onChange, onValidate }) => { /* monaco if available, else textarea with code font; validate via AJV */ return null }",
    "CharacterFormDrawer.jsx": "export const CharacterFormDrawer = ({ open, onOpenChange, onSubmit, initial }) => { /* use ./components/ui/sheet + form primitives; right-side preview */ return null }",
    "Page exports": "Pages should default export functions (export default function WorkDetail(){...}) while components use named exports"
  },

  "tailwind_utility_recipes": {
    "pill_badge": "inline-flex items-center gap-1 rounded-full bg-accent text-[11px] px-2 py-1 text-[color:hsl(var(--accent-foreground))]",
    "card_base": "rounded-lg border bg-card p-5 shadow-[0_1px_0_rgba(0,0,0,0.02)]",
    "dropzone": "flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors"
  },

  "image_urls": [
    {
      "url": "https://images.unsplash.com/photo-1673528076919-a69be48560c6?crop=entropy&cs=srgb&fm=jpg&q=85",
      "description": "Minimal writer desk with natural light",
      "category": "hero_header",
      "placement": "Dashboard top strip background image overlay at 8–12% opacity"
    },
    {
      "url": "https://images.unsplash.com/photo-1598016677484-ad34c3fd766e?crop=entropy&cs=srgb&fm=jpg&q=85",
      "description": "Warm wooden workspace",
      "category": "empty_state",
      "placement": "Used in DataEmptyState illustration block for Works and Characters"
    },
    {
      "url": "https://images.pexels.com/photos/8092453/pexels-photo-8092453.jpeg",
      "description": "Clean desk with frame and mug",
      "category": "onboarding",
      "placement": "Onboarding modal or guide cards"
    }
  ],

  "content_guidelines": {
    "tone": "Encouraging, precise, non-intrusive. Use verbs that support creative flow (Create, Draft, Refine)",
    "empty_states": [
      "Works: 'Start a new universe. A Work groups your races and characters.' CTA: Create Work",
      "Races: 'Define species/lineages using a JSON template.' CTA: Add Race",
      "Characters: 'Bring your cast to life. Use a Race template or go custom.' CTA: Add Character"
    ]
  },

  "dark_mode": {
    "strategy": "class-based .dark with tokens above",
    "surfaces": "High-contrast neutrals with subtle borders; avoid gradients in content areas",
    "accent_usage": "Keep accent backgrounds subdued (accent 18–22% lightness)"
  },

  "index_css_overrides": {
    "instructions": "Update /app/frontend/src/index.css :root tokens to the 'color_system.tokens_hsl' above and .dark to 'dark_tokens_overrides'. Ensure body uses var(--background) & var(--foreground). Remove or avoid any app-wide center alignment in App.css."
  },

  "qa_checklist": [
    "No 'transition: all' anywhere; only color/shadow/opacity transitions",
    "Gradients not exceeding 20% viewport and never behind long text",
    "All interactive elements have data-testid",
    "Tables are accessible with proper headers and focus states",
    "Mobile: Sheets for creation/editing flows; avoid cramped modals",
    "High-contrast text on tokens across light/dark"
  ],

  "instructions_to_main_agent": {
    "priority_order": [
      "Implement tokens and fonts",
      "Build Dashboard > Work Detail split > Character flows",
      "Add DynamicFieldRenderer with AJV validation",
      "Integrate image upload UI with placeholder",
      "Wire toasts and testid attributes"
    ],
    "avoid": [
      "Do not center the overall app container",
      "Do not use HTML-native dropdowns when shadcn Select exists",
      "Do not apply gradients on content blocks or small elements"
    ]
  },

  "references_and_inspo": {
    "influences": [
      "World Anvil (feature depth)",
      "Campfire (clean, approachable UI)",
      "Notion (calm density and structure)",
      "Shadcn dashboards for table/forms visual language"
    ]
  },

  "general_ui_ux_guidelines": "- You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals."
}
