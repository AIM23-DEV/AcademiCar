# React Components
- [x] [Button](#button)
- [x] [TextButton](#textbutton)
- [x] [IconButton](#iconbutton)
- [x] [Card](#card)
- [x] [LinkCard](#linkcard)
- [x] [BottomNavigationBar](#bottomnavigationbar)
- [x] [Input](#input)
- [x] [Dropdown](#dropdown)
- [x] [Toggle](#toggle)
- [x] [Checkmark](#checkmark)
- [x] [Radio](#radio)
- [x] [Divider](#divider)
- [x] [TitleBar](#titlebar)
- [x] [Toast](#toast)
- [x] [Stepper](#stepper)
- [x] [EmptyState](#empty-state)
- [x] [Tabs](#tabs)
- [x] [Pagination](#pagination)
- [x] [Slider](#slider)

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

## Card
Parameter
```js
// Beschreibt den Wert, der das Label mit dem Feld verknüpft
id: string

// Beschreibt den Titel der Karte
label: string | ReactNode

// Beschreibt die Position des Labels
// Das Label kann innerhalb oder außerhalb der Karte positioniert werden
labelPosition: 'outside' | 'inside'

// Beschreibt den Link einer zusätzlichen Aktion außerhalb der Karte
outsideLink: string

// Beschreibt den Text des Links
// Hinter dem Text versteckt sich der tatsächliche Link
outsideLinkText: string

// Beschreibt die Abstände der Karte
// Use sm only if the card does not use the full screen width. Only use sm with inside label
padding: 'base' | 'sm' 

// Beschreibt weiteren Inhalt des Empty States
// Kann jede Art von HTML Elementen enthalten
children: ReactNode

// Beschreibt zusätzliche Styles oder Overwrites von bestehenden Klassen
className: string
```

Import
```js
import {Card} from "./components/Cards.tsx";
```

Anwendung
```js
<Card
  id="eine-id"
  label="Ein Label"
  labelPosition="outside"
  outsideLink="https://google.com"
  outsideLinkText="Outside Link"
  padding="base"
  className="mt-8"
>
  <p>Hier könnte jede Art von HTML stehen</p>
</Card>
```

## LinkCard
Parameter
```js
// Beschreibt den Wert, der das Label mit dem Feld verknüpft
id: string

// Beschreibt den Titel der Karte
label: string | ReactNode

// Beschreibt die Position des Labels
// Das Label kann innerhalb oder außerhalb der Karte positioniert werden
labelPosition: 'outside' | 'inside'

// Beschreibt den Link einer zusätzlichen Aktion außerhalb der Karte
outsideLink: string

// Beschreibt den Text des Links
// Hinter dem Text versteckt sich der tatsächliche Link
outsideLinkText: string

// Beschreibt die Abstände der Karte
// Use sm only if the card does not use the full screen width. Only use sm with inside label
padding: 'base' | 'sm'

// Beschreibt den Link, der beim Klick auf die gesamte Karte ausgeführt wird
link: string

// Beschreibt weiteren Inhalt des Empty States
// Kann jede Art von HTML Elementen enthalten
children: ReactNode

// Beschreibt zusätzliche Styles oder Overwrites von bestehenden Klassen
className: string
```

Import
```js
import {Card, LinkCard} from "./components/Cards.tsx";
```

Anwendung
```js
<LinkCard
  id="eine-id"
  label="Ein Label"
  labelPosition="outside"
  outsideLink="https://google.com"
  outsideLinkText="Outside Link"
  padding="base"
  link="https://maps.google.com"
  className="mt-8"
>
  <p>Hier könnte jede Art von HTML stehen</p>
</LinkCard>
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

## Toggle
Parameter
```js
// Beschreibt den Text neben dem Feld, der Text soll das Feld beschreiben
label: string

// Beschreibt, ob der Button disabled ist
disabled: boolean

// Beschreibt zusätzliche Styles oder Overwrites von bestehenden Klassen
className: string
```

Import
```js
import {Input, Select, Toggle} from "./components/FormFields.tsx"
```

Anwendung
```js
<Toggle
  label="Ein Label"
  disabled={false}
  className="mt-8"
/>
```

## Checkmark
Parameter
```js
// Beschreibt den Text neben dem Feld, der Text soll das Feld beschreiben
label: string

// Beschreibt den Wert, der das Label mit dem Feld verknüpft
id: string

// Beschreibt, ob der Button disabled ist
disabled: boolean

// Beschreibt zusätzliche Styles oder Overwrites von bestehenden Klassen
className: string
```

Import
```js
import {Input, Select, Toggle, Checkmark} from "./components/FormFields.tsx"
```
        
Anwendung
```js
<Checkmark
  label="Ein Label"
  id="eine-id"
  disabled={false}
  className="mt-8"
/>
```

## Radio
Parameter
```js
// Beschreibt die ID bzw. den Namen der gesamten Radio Gruppe
id: string

// Beschreibt den State der Komponente
value: any

// Setzt den aktuellen State
setValue: (value: any) => void

// Beschreibt die einzelnen Einträge
// Die Einträge sind vom Typ RadioItemProps
items: Array<RadioItemProps>
        
// Beschreibt, ob die Einträge ein- oder zweispaltig angezeigt werden 
columns: 1 | 2

// Beschreibt, ob ein Divider zwischen den einzelnen Einträgen angezeigt wird
// Der Divider ist nur bei einer Spalte möglich
useDivider: boolean

// Beschreibt zusätzliche Styles oder Overwrites von bestehenden Klassen
className: string
```

RadioItemProps Parameter
```js
// Beschreibt den Wert, der hinter einem Radio Eintrag liegt
value: any

// Beschreibt den Titel eines Radio Wertes
label: string | ReactNode

// Beschreibt, ob der Radio Eintrag aktiv ist
disabled: boolean
```

Import
```js
import {Input, Select, Toggle, Checkmark, RadioCollection} from "./components/FormFields.tsx"
```

Anwendung
```js
<RadioCollection value={radioValue} setValue={setSetRadioValue} items={[
    {
        value: 1,
        label:
            <div className="flex flex-row space-x-3">
                <span>Radio 1</span>
                <BiLeaf className="icon"/>
            </div>
    },
    {value: 2, label: "Radio 2"},
    {value: 3, label: "Radio 3", disabled: true},
    {value: 4, label: "Radio 4"},
]} useDivider columns={1}/>
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

## Stepper
Parameter
```js
// Beschreibt die Anzahl der möglichen Schritte
steps: number

// Beschreibt die aktuelle Position innerhalb der Prozessschritte
current: number

// Beschreibt zusätzliche Styles oder Overwrites von bestehenden Klassen
className: string
```

Import
```js
import {Stepper} from "./components/Stepper.tsx";
```

Anwendung
```js
<Stepper
  steps={4}
  current={2}
  className="mt-8"
/>
```

## Empty State
Parameter
```js
// Beschreibt das Icon des Empty State
icon: ReactNode

// Beschreibt den Titel des Empty State
title: string | ReactNode

// Beschreibt den Untertitel des Empty States
subtitle: string | ReactNode

// Beschreibt weiteren Inhalt des Empty States
// Kann jede Art von HTML Elementen enthalten
children: ReactNode

// Beschreibt, ob der State als Karte ausgegeben wird
asCard: boolean

// Beschreibt zusätzliche Styles oder Overwrites von bestehenden Klassen
className: string
```

Import
```js
import {EmptyState} from "./components/EmptyState.tsx";
```

Anwendung
```js
<EmptyState
  icon={<BiSearch className="icon-lg"/>}
  title="Der Titel"
  subtitle="Der Subtitel"
  asCard={true}
  className="mt-8"
>
  <p>Hier könnte jede Art von HTML stehen</p>
</EmptyState>
```

## Tabs
Parameter
```js
// Beschreibt die einzelnen Tabs
// Die Einträge sind vom Typ Tabinfo
items: Array<TabInfo>
        
// Beschreibt den Index bzw. Tabeintrag, der beim Pageload angezeigt wird
// Index startet bei 0
current: number

// Beschreibt zusätzliche Styles oder Overwrites von bestehenden Klassen
className: string

// Beschreibt weiteren Inhalt des Empty States
// Kann jede Art von HTML Elementen enthalten
children: ReactNode
```

TabInfo Parameter
```js
// Beschreibt den Namen eines Tabs
name: string

// Beschreibt das Icon eines Tabs
icon: ReactNode

// Beschreibt die Zahl, die bei einem Tab angezeigt wird
// Diese Zahl soll zum Beispiel Notifications symbolisieren
count: number
```

Import
```js
import {Tabs} from "./components/Tabs.tsx";
```

Anwendung
```js
<Tabs
  items={[
    {name: "Tab 1", count: 2, icon: <BiLeaf className="icon-md" />},
    {name: "Tab 2", icon: <BiCar className="icon-md" />},
    {name: "Tab 3"},
  ]}
  current={2}
  className="mt-8"
>
  <p>Hier könnte jede Art von HTML stehen</p>
</Tabs>
```

## Pagination
Parameter
```js
// Beschreibt die aktuelle Seite bzw. die Seite auf der gestartet wird
page: number

// Beschreibt die Gesamtanzahl der vorhandenen Seiten
totalPages: number

// Beschreibt, ob die Seiten angezeigt werden
// Alternativ gibt es nur die Buttons für die Navigation
showPages: boolean

// Beschreibt zusätzliche Styles oder Overwrites von bestehenden Klassen
className: string
```

Import
```js
import {Pagination} from "./components/Pagination.tsx";
```

Anwendung
```js
<Pagination
  page={1}
  totalPages={10}
  showPages={true}
  className="mt-8"
/>
```

## Slider
Parameter
```js
// Beschreibt den State des Sliders
value: number | number[]

// Setzt den State des Sliders
setValue: ((value: number | number[]) => void)

// Beschreibt den geringsten Wert des Sliders
min: number

// Beschreibt den höchsten Wert des Sliders
max: number

// Beschreibt, wie groß die Schritte des Sliders sind
step: number

// Beschreibt, ob Abschnittspunkte angezeigt werden
dots: boolean

// Beschreibt, ob 
range: boolean

// Beschreibt, ob der Button disabled ist
disabled: boolean

// Beschreibt zusätzliche Styles oder Overwrites von bestehenden Klassen
className: string
```

Import
```js
import {Slider} from "./components/Slider.tsx";
```

Anwendung
```js
// State für einen Slider
const [slider, setSlider] = useState<number | number[]>(70);

// State für einen Slider mit Range
const [slider, setSlider] = useState<number | number[]>([70, 120]);

<Slider
  value={slider}
  setValue={setSlider}
  min={50}
  max={200}
  step={10}
  dots
/>
```