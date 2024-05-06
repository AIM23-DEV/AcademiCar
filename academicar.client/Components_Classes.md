# React Components
- [x] [Button](#button)
- [x] [TextButton](#textbutton)
- [x] [IconButton](#iconbutton)
- [] CardInnerLabel
- [] CardOuterLabel
- [x] [BottomNavigationBar](#bottomnavigationbar)
- [x] [Input](#input)
- [x] [Dropdown](#dropdown)
- [x] [Divider](#divider)
- [x] [TitleBar](#titlebar)
- [x] [Toast](#toast)
- [] Toggle
- [] Checkbox
- [] Radio

---

# Tailwind Classes
Typografie
```js
headline-1
headline-2
headline-3
headline-4

// button text
subtitle
body-1
body-2
body-2-semibold
```

---

# Icons
Liste aller Icons: https://react-icons.github.io/react-icons/icons/bi/

1. Importieren: `import { IconName } from "react-icons/bi";`
2. Im Code verwenden: `<IconName className="icon text-primary-600">`

**Parameter**
- size
  - icon (Standard Icons)
  - icon-md (Chevron Icons & IconButton)
  - icon-lg (BottomNavigation)
  - Bsp.: `className=icon`
- color
  - Tailwind Klasse für Textfarben
  - Bsp.: `text-primary-600`

**Weitere Informationen**
- Der einzusetzenden IconName entspricht den Namen auf der verlinkten Website

---

# Anwendung der Components

## Button
Parameter
```js
// Beschreibt das Aussehen des Buttons
variant: 'primary' | 'secondary' | 'accent' | 'outline'

// Beschreibt, ob der Button über die geamte Seitenbreite reicht
fullWidth: boolean

// Beschreibt den textuellen Inhalt des Buttons
text: string

// Beschreibt die Ausrichtung des Textes
textAlign: 'center' | 'left' | 'right'

// Beschreibt, ob der Text die maximale Breit einnimmt
textFullWidth: boolean

// Beschreibt das Icon vor dem Text
trailing: ReactNode

// Beschreibt das Icon nach dem Text
leading: ReactNode

// Beschreibt den Typ des Buttons
type: 'button' | 'submit' | 'reset'

// Beschreibt, ob der Button disabled ist
disabled: boolean

// Beschreibt zusätzliche Styles oder Overwrites von bestehenden Klassen
className: string

// Beschreibt die ausgeführte Funktion, wenn der Button geklickt wird
onClick: MouseEventHandler<HTMLButtonElement>
```

Import
```js
import { Button } from './components/Buttons.tsx'
```
Anwendung
```js
<Button
    variant="primary"
    fullWidth
    text="ButtonText"
    textAlign="left"
    textFullWidth
    leading={<BiJoystick className="icon"/>}
    trailing={<BiChevronRight className="icon"/>}
    type="button"
    disabled
    className="mt-2"
    onClick={() => {
        alert("Test");
    }}
/>
```

## TextButton
Parameter
```js
// Beschreibt das Aussehen des Buttons
variant: 'primary' | 'secondary' | 'accent' | 'outline'

// Beschreibt, ob der Button über die geamte Seitenbreite reicht
fullWidth: boolean

// Beschreibt den textuellen Inhalt des Buttons
text: string

// Beschreibt die Ausrichtung des Textes
textAlign: 'center' | 'left' | 'right'

// Beschreibt, ob der Text die maximale Breit einnimmt
textFullWidth: boolean

// Beschreibt das Icon vor dem Text
trailing: ReactNode

// Beschreibt das Icon nach dem Text
leading: ReactNode

// Beschreibt den Typ des Buttons
type: 'button' | 'submit' | 'reset'

// Beschreibt, ob der Button disabled ist
disabled: boolean

// Beschreibt zusätzliche Styles oder Overwrites von bestehenden Klassen
className: string

// Beschreibt die ausgeführte Funktion, wenn der Button geklickt wird
onClick: MouseEventHandler<HTMLButtonElement>
```

Import
```js
import { Button, TextButton } from './components/Buttons.tsx'
```
Anwendung
```js
<TextButton
    variant="primary"
    fullWidth
    text="ButtonText"
    textAlign="left"
    textFullWidth
    leading={<BiJoystick className="icon"/>}
    trailing={<BiChevronRight className="icon"/>}
    type="button"
    disabled
    className="mt-2"
    onClick={() => {
        alert("Test");
    }}
/>
```

## IconButton
Parameter
```js
// Beschreibt das Aussehen des Buttons
variant: 'primary' | 'secondary' | 'accent' | 'outline'

// Beschreibt, ob der Button über die geamte Seitenbreite reicht
fullWidth: boolean

// Beschreibt das Icon des Buttons
icon: ReactNode

// Beschreibt den Typ des Buttons
type: 'button' | 'submit' | 'reset'

// Beschreibt, ob der Button disabled ist
disabled: boolean

// Beschreibt zusätzliche Styles oder Overwrites von bestehenden Klassen
className: string

// Beschreibt die ausgeführte Funktion, wenn der Button geklickt wird
onClick: MouseEventHandler<HTMLButtonElement>
```

Import
```js
import { Button, TextButton, IconButton } from './components/Buttons.tsx'
```
Anwendung
```js
<IconButton
    variant="primary"
    icon={<BiJoystick className="icon"/>}
    type="button"
    disabled
    className="mt-2"
    onClick={() => {
        alert("Test");
    }}
/>
```

## BottomNavigationBar
Parameter
```js
// Beschreibt welcer der Navigationspunkte aktuell ausgewählt ist
selected: 'search' | 'trips' | 'create' | 'chat' | 'profile'

// Beschreibt zusätzliche Styles oder Overwrites von bestehenden Klassen
className: string
```

Import
```js
import {BottomNavigationBar} from "./components/BottomNavigationBar.tsx";
```

Anwendung
```js
<BottomNavigationBar selected="search"/>
```

## Input
Parameter
```js
// Beschreibt den Text über dem Feld, der Text soll das Feld beschreiben
label: string

// Beschreibt den Wert, der das Label mit dem Feld verknüpft
id: string

// Beschreibt den Typen des Feldes (z.B. text, email, number ...)
type: string

// Beschreibt, ob das Feld über die geamte Seitenbreite reicht
fullWidth: boolean

// Beschreibt den Text, der angezeigt wird, solange noch nichts eingetragen wurde
placeholder: string

// Beschreibt, ob das Feld ein Pflichtfeld ist
required: boolean

// Beschreibt das Icon vor dem Text
leading: ReactNode

// Beschreibt das Icon nach dem Text
trailing: ReactNode

// Beschreibt zusätzliche Styles oder Overwrites von bestehenden Klassen
className: string
```

Import
```js
import {Input} from "./components/FormFields.tsx"
```

Anwendung
```js
<Input
    label="Ein Label"
    id="eine-id"
    type="text"
    fullWidth={true}
    placeholder="Placeholder Text"
    required={true}
    leading={<BiCar className="icon"/>}
    trailing={<BiCar className="icon"/>}
    className="my-8"
/>
```

## Dropdown
Parameter
```js
// Beschreibt den Text über dem Feld, der Text soll das Feld beschreiben
label: string

// Beschreibt den Wert, der das Label mit dem Feld verknüpft
id: string

// Beschreibt, ob das Feld über die geamte Seitenbreite reicht
fullWidth: boolean

// Beschreibt, ob das Feld ein Pflichtfeld ist
required: boolean

// Beschreibt die Objekte, zwischen welchen später gewählt werden kann
// Hier werden ein Value und ein Text mitgegeben
options: object

// Beschreibt zusätzliche Styles oder Overwrites von bestehenden Klassen
className: string
```

Import
```js
import {Input, Select} from "./components/FormFields.tsx"
```

Anwendung
```js
<Select
    label="Ein Label"
    id="eine-id"
    fullWidth={false}
    required={true}
    options={{1: "erster Eintrag", zwei: "zweiter Eintrag"}}
    className="my-8"
/>
```

## Divider
Parameter
```js
// Beschreibt was im Divider angezeigt wird
// Kann ein beliebiger string oder auch html sein
// Kann auch leer gelassen werden
content: string | ReactNode

// Beschreibt zusätzliche Styles oder Overwrites von bestehenden Klassen
className: string
```

Import
```js
import {Divider} from "./components/Divider.tsx"
```

Anwendung
```js
<Divider
    content={<><BiSearch className="icon-lg"/><p>Suche</p></>}
    className="my-8"
/>
```

## Titlebar
Parameter
```js
// Beschreibt den Titel der Seite
text: string

// Beschreibt, ob eine Rück-Navigation vorhanden ist
hasBackAction: boolean

// Beschreibt ein zusätliches Icon (mit Funktion) auf der rechten Bildschrimseite
trailing: ReactNode

// Beschreibt zusätzliche Styles oder Overwrites von bestehenden Klassen
className: string
```

Import
```js
import {TitleBar} from "./components/TitleBar.tsx";
```

Anwendung
```js
<TitleBar
    text="AcademiCar"
    trailing={<BiSearch className="icon-lg"/>}
    hasBackAction
    className="my-8"
/>
```

## Toast
Parameter
```js
// Beschreibt die Art des Toasts
variant: 'success' | 'error' | 'warning' | 'info' | 'hint'

// Beschreibt die Nachricht, die der Toast überbringt
message: string

// Beschreibt zusätzliche Styles oder Overwrites von bestehenden Klassen
className: string
```

Import
```js
import {Toast} from "./components/Toast.tsx";
```

Anwendung
```js
<Toast
    variant="success"
    message="Eine erfolgreiche Nachricht"
/>
```