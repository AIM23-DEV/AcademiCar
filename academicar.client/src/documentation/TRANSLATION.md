# Übersetzung: Anwendung und Struktur

Hier gibt es alle Infos zur Anwendung und Erstellung von Übersetzungsfiles.

- [Dateistruktur](#dateistruktur)
- [JSON Struktur](#json-struktur)
- [Anwendung von Übersetzungen](#anwendung-von-übersetzungen)
- [Hinzufügen einer neuen Übersetzungsdatei](#hinzufügen-einer-neuen-übersetzungsdatei)

## Dateistruktur
```
src
└───translations
    ├───de
    │   ├───auth.json
    │   ├───chat.json
    │   ├───common.json
    │   ├───profile.json
    │   ├───search.json
    │   └───trips.json
    └───en
        ├───auth.json
        ├───chat.json
        ├───common.json
        ├───profile.json
        ├───search.json
        └───trips.json
```

## JSON Struktur
- Neue Werte müssen in beiden (de und en) Dateien eingetragen werden
- Die Struktur der beiden Seiten sollte identisch sein
```
{
    "title": "AcademiCar",

    "buttons": {
        "search": "Suchen"
    },

    "language-selector": {
        "label": "Wähle deine Sprache aus",
        "languages": {
            "de": "Deutsch",
            "en": "Englisch"
        }
    }
    
    "example": "Ein Beispiel mit {{variable}}"
}
```

## Anwendung von Übersetzungen

Import
```js
import {useTranslation} from "react-i18next";
```

Funktion
```js
export const ExamplePage = () => {
    
    // t wird als Funktionsaufruf für die Übersetzung verwendet
    const {t} = useTranslation();

    return (<>...</>)}
```


Anwendung
- Der Wert vor dem Doppelpunkt beschreibt die Übersetzungsdatei aus der geladen werden soll
- Alles ab dem Doppelpunkt beschreibt die JSON-Struktur bis hin zum gewünschten Wert
```js
// Anwendung ohne Verschachtelung
<div>{t('common:title')}</div>

// Anwendung mit Verschachtelung
// Tiefere Verschachtelungen werden jeweils mit einem "." angegeben
<div>{t('common:language-selector.label')}</div>
<div>{t('common:language-selector.languages.de')}</div>

// Anwendung mit einer Variable
<div>this one? {t('common:example', {variable: 'test'})}</div>

// Anwendung einer anderen Übersetzungsdatei
<div>{t('profile:title')}</div>
```

Alternative Anwendung

Wenn bereits klar ist, dass nur Übersetzungen aus einer Datei benötigt werden, kann die Datei auch bei Erstellung der t-Konstante mitgegeben werden.
Dadurch entfällt das Angeben des Dateinamens beim Methodenaufruf.

```js
const {t} = useTranslation('common');

<div>{t('language-selector.languages.de')}</div>
```

## Hinzufügen einer neuen Übersetzungsdatei
