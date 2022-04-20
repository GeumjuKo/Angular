import { Renderer2, Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  constructor(@Inject(DOCUMENT) private document: Document) { 
  }

  public loadJsScript(renderer: Renderer2, src: string): HTMLScriptElement {
    const script = renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    // this.document.getElementsByTagName('head')[0].appendChild(script)
    // renderer.appendChild(this.document.head, "https://code.jquery.com/jquery-3.6.0.min.js")
    renderer.appendChild(this.document.body, script);
    console.log(script)
    return script;
  }

}
