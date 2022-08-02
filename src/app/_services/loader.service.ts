import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  
  loadertemplate :  string = "<div id='loadericon' class='spinner-border text-danger m-1 spinner-alignment' role='status'><span class='sr-only'>Loading...</span></div>"

  constructor(@Inject(DOCUMENT) private document: Document) {
}

  isActive :boolean = false;

  //add the component to the page displaying the loader
  generateLoaderComponent() : void {

    this.document.getElementById('loadericon')?.classList.remove('d-none');
    this.document.getElementById('MainBody')?.classList.add('loaderBackground');
   
   if(!this.isActive)
   {
        // let pagebody :HTMLElement =   this.document.getElementsByTagName('body')[0];
        // pagebody.append(this.loadertemplate);

        let element = document.createElement("div");
        element.setAttribute('id', 'loadericon');
        element.setAttribute('role', 'status');
        element.classList.add('spinner-border', 'text-danger', 'm-1', 'spinner-alignment');

        document.body.append(element);

        this.isActive = true;
   }

    
  }
 
  removeLoaderComponent () : void
  {
    let pagebody : HTMLElement | null =   this.document.getElementById('loadericon');
    if(null!=pagebody)
    {
    // document.removeChild(pagebody);
      setTimeout(function(){
        document.getElementById('loadericon')?.classList.add('d-none')
        document.getElementById('MainBody')?.classList.remove('loaderBackground');
      }, 2000);
    }
  }


}
