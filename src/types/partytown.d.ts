declare module '@builder.io/partytown/react' {
  import * as React from 'react';
  
  export interface PartytownProps {
    debug?: boolean;
    forward?: string[];
    lib?: string;
    loadScriptsOnMainThread?: boolean;
    mainWindowAccessors?: string[];
    resolveUrl?: (url: URL, location: Location, type: string) => URL | undefined | null;
    sandbox?: string;
    scripts?: { [key: string]: any }[];
  }

  export const Partytown: React.ComponentType<PartytownProps>;
}
