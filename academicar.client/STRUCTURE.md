# Struktur, Routes & Pages

Hier findest du Informationen über die Datei-Struktur und das Erstellen und Verwalten von Routes und Pages.

## Allgemeine Datei-Struktur

```
src
├───assets // Bilder, Dateien, usw.
├───components // Wiederverwendbare React-Komponenten
├───hooks // React-Hooks
├───pages // Alle Seiten, folgt dem gleichen Schema wie die URLs
│   ├───auth
│   ├───chat
│   ├───profile
│   ├───search
│   │   └───partials // Komponenten, welche Teile von Seiten enthalten
│   └───trips
├───routes // Die Konfiguration der URLs
└───scss // Die CSS Dateien
    └───components
```

## /assets

Hier werden Dateien auf die unsere Anwendung zugreifen muss gespeichert. Das sind zum Beispiel Logo-Dateien oder
Dokumente die man herunterladen kann.

## /components

Hier werden wiederverwendbare Komponenten gespeichert. Allgemeine Komponenten sollen direkt in diesem Ordner landen,
spezielle Komponenten welche z. B. nur in der Suche gebraucht werden sollten jeweils einen Unterordner bekommen.

## /hooks

Hier befinden sich zusätzlich benötigte React-hooks.

## /pages

Alle Seiten befinden sich in diesem Ordner. Die Unterordner folgen jeweils der Struktur der URLs.
Wenn hier Teile einer Seite in eigene Komponenten ausgelagert werden, welche aber nicht an anderen Stellen
wiederverwendet werden, so kommen diese in einen ```/partials``` Ordner in dem Unterordner, in dem sich auch die Seite
befindet.
Wenn die ausgelagerten Teile auch in anderen Pfaden genutzt werden soll, dann sollte diese Komponente nicht
in ```/partials``` sein, sondern im zuvor beschriebenen ```/components``` Ordner.
Ein Beispiel für diese Struktur befindet sich im ```/pages/search/partials``` Ordner.

> **Die Benennung der Seiten folgt einem bestimmten Schema: ```{Action}{Entity}Page```**

### Actions

Die erlauben Wörter für Aktionen sind wie folgt:

- Index
- Create
- Show
- Update
- Search

Falls keine dieser Aktionen für deine Seite logisch ist, melde dich bitte bei Andreas :)

### Entities

Entities sind alle von uns unterstützten Objekte, beispielsweise User, Trip, Chat, usw.
Dieser Teil der Benennung von Pages sollte in Einzahl oder Mehrzahl verwendet werden, je nach Aktion.

> IndexEntitiesPage ➡️ Mehrzahl

> ShowEntityPage ➡️ Einzahl

## /routes

Hier werden die URLs definiert, welche in unserer Applikation zur Verfügung stehen.
Geladen werden die Routen in [App.tsx](./src/App.tsx), diese Datei sollte jedoch nicht verändert werden, außer neue
Sektionen werden benötigt.

Jede Datei sollte hier ein Präfix verwenden, welches auf alle Routen in der Datei angewandt wird. Die einzige Ausnahme
hiervon ist das [AdditionalRoutes](./src/routes/AdditionalRoutes.tsx) File.
Hier ist ein Beispiel einer solchen Datei:

```
export default <Route key="trips" path="/trips" element={<Outlet/>}>

    <Route key="" path="" element={<IndexTripsPage/>}/>,
    <Route key="create" path="create" element={<CreateTripPage/>}/>,
    <Route key=":id" path=":id" element={<ShowTripPage/>}/>,

</Route>;
```

Das Root-Element bekommt hierbei das Präfix als ```key``` und ```path``` Property sowie ein ```<Outlet/>```
als ```element```.\
Allgemein bekommen Routen immer den gleichen Wert für ```key``` und ```path``` und die jeweilige Page welche an dieser
URL geladen werden soll.

In diesem Beispiel werden die folgenden Routen erstellt:

> /trips ➡️ IndexTripsPage
> /trips/create ➡️ CreateTripPage
> /trips/:id ➡️ ShowTripPage

Für weitere Informationen zum Routing schau in die [Dokumentation](https://reactrouter.com/en/main) oder melde dich bei
Andreas oder Vanessa.

## /scss

Hier befindet sich das CSS unseres Projektes. Du solltest hier keine Änderungen vornehmen müssen,
sondern [Tailwind Klassen](https://tailwindcss.com/) verwenden. Bei Problemen melde dich bitte bei Andreas oder Vanessa.