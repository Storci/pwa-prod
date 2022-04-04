// Carica le funzioni globali
import * as tw from "./Global/Thingworx/thingworx_api_module.js"

try{
  let entityName = localStorage.getItem('global_entityName')

  // Recupera i dati generali delle linee installate dal cliente
  tw.service_02_getLinesGeneralInfo(entityName)
  .then(res => {
    if(JSON.stringify(res) !== '{}'){
      res.array.forEach((item, i) => {
        // Recupera l'url della pagina visualizzata
        // Effettua uno split dell'url recuperato dividendo la stringa tramite lo /
        // recupera il nome della pagina
        let pageURL = window.location.href
        pageURL = pageURL.split('\/')
        let pageName = pageURL[pageURL.length-1]

        // Calcola il numero della linea, somma 1 all'indice del for
        let num = i + 1

        // Recupera l'id dell'elemento accordion della linea.
        // L'accordion è gia presente nella sidebar, è nascosto tramite la classe d-none
        // Se un cliente ha una linea, il codice sottostante elimina la classe d-none
        let idacc = '#accordionLine0' + num
        $(idacc).removeClass('d-none')

        // Modifica l'href da richiamare quando si preme il pulsante del menu
        // ref deve passare alla pagina 04_Line.html l'entityName della linea
        // In questo modo la pagina riesce a recuperare i dati dalla linea corretta
        let href = '04_Line.html?entityName=' + item.entityName
        let idnav = '#nav-line0' + num + '-dashboard'
        $(idnav).attr('href', href)


        if(pageName == href){
          $(idnav).addClass('active')
          $(idnav).attr('href', '#')

          /*
          accordionButtonClass = 'accordion-button'
          aria_expanded = "true"
          panelCollapse = 'accordion-collapse collapse show'
          */
        }


        /*
        let navclass = 'nav-link '
        let href = '04_Line.html?entityName=' + item.entityName
        let accordionButtonClass = 'accordion-button collapsed'
        let aria_expanded = "false"
        let panelCollapse = 'accordion-collapse collapse'


        let nomeLinea = item.nome_linea

        let idCollapse = 'collapse' + i
        let numCollapse = 'collapsePanel' + i
        let accordiom_item = ''
        accordiom_item += '<div class="accordion-item" data-pg-collapsed> '
        accordiom_item +=    '<h2 class="accordion-header" id="' + idCollapse + '" data-pg-collapsed> <button class="' + accordionButtonClass + '" type="button" data-bs-toggle="collapse" data-bs-target="#' + numCollapse + '" aria-expanded="' + aria_expanded + '" aria-controls="' + numCollapse + '">' + nomeLinea + '</button> </h2> '
        accordiom_item +=    '<div id="' + numCollapse + '" class="' + panelCollapse + '" aria-labelledby="collapse2" data-bs-parent="#panels1" data-pg-collapsed></div>'
        accordiom_item += '</div>'

        let idaccordion = '#panels1'
        $(idaccordion).append(accordiom_item)


        let navitem = ''
        navitem += '<li class="nav-item">'
        navitem +=   '<a class="' + navclass + '" href="' + href + '">'
        navitem +=      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file">'
        navitem +=          '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>'
        navitem +=          '<polyline points="13 2 13 9 20 9"></polyline>'
        navitem +=      '</svg>'
        navitem +=      '<span class="ms-1">Dashboard</span>'
        navitem +=   '</a>'
        navitem += '</li>'

        let idnav = '#' + numCollapse
        $(idnav).append(navitem)
        */
      })
    }
  })

  // Recupera i dati generali delle celle installate dal cliente
  tw.service_01_getDryersGeneralInfo(entityName)
  .then(res => {
    if(JSON.stringify(res) !== '{}'){
      let pageURL = window.location.href
      pageURL = pageURL.split('\/')

      let idnav = '#accordionDryers100'
      $(idnav).removeClass('d-none')
      /*
      let navclass = 'nav-link '
      let href = '03_Dryers.html'
      let accordionButtonClass = 'accordion-button collapsed'
      let aria_expanded = "false"
      let panelCollapse = 'accordion-collapse collapse'
      if(pageURL[pageURL.length-1] == href){
        navclass += ' active'
        href = '#'
        accordionButtonClass = 'accordion-button'
        aria_expanded = "true"
        panelCollapse = 'accordion-collapse collapse show'
      }

      let idCollapse = 'collapse' + 100
      let numCollapse = 'collapsePanel' + 100
      let accordiom_item = ''
      accordiom_item += '<div class="accordion-item" data-pg-collapsed> '
      accordiom_item +=    '<h2 class="accordion-header" id="' + idCollapse + '" data-pg-collapsed> <button class="' + accordionButtonClass + '" type="button" data-bs-toggle="collapse" data-bs-target="#' + numCollapse + '" aria-expanded="' + aria_expanded + '" aria-controls="' + numCollapse + '">Celle</button> </h2> '
      accordiom_item +=    '<div id="' + numCollapse + '" class="' + panelCollapse + '" aria-labelledby="collapse2" data-bs-parent="#panels1" data-pg-collapsed></div>'
      accordiom_item += '</div>'

      let idaccordion = '#panels1'
      $(idaccordion).append(accordiom_item)

      let navitem = ''
      navitem += '<li class="nav-item">'
      navitem +=   '<a id="IDNavItemDryers" class="' + navclass + '" href="' + href + '">'
      navitem +=      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file">'
      navitem +=          '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>'
      navitem +=          '<polyline points="13 2 13 9 20 9"></polyline>'
      navitem +=      '</svg>'
      navitem +=      '<span class="ms-1">Dashboard</span>'
      navitem +=   '</a>'
      navitem += '</li>'

      let idnav = '#' + numCollapse
      $(idnav).append(navitem)
      */
    }
  })
}catch(e){}
