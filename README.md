# react-sais

Set of React Hook's to be used with SSR

## Installation

```sh
npm install react-sais --save
yarn add react-sais
bower install react-sais --save
```

## Current Lib Hooks

- useWindow
- useGeoLocation

## Usage

```typescript
import * as React from "react";
import { useWindow, useGeoLocation } from "custom-hook";

export default function Home() {
  const hook = useWindow();
  const location = useGeoLocation();

  return <div>{JSON.stringify([hook, location])}</div>;
}
```

## Made by

<p align="center">
  <br />
  ZauJulio ❤️
  <br />
</p>
