// Carica le funzioni globali
import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as am from "./Global/amchart/amchart_functions.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"
import * as lang from "./Global/Common/Translation.js"
import * as common from "./Global/Common/commonFunctions.js"
import * as theme from "./Global/Common/Theme.js"

theme.changeColorTheme()

// definisce l'url di base della pagina attuale (in questo caso della pagina index.html).
// il risultato è http(s)://xxx.xxx.xxx.xxx:xxxx
// baseURL verrà utilizzato come base per il cambio pagina.
/*
let baseURL = window.location.protocol + "//" + window.location.host
let pageURL = window.location.href
*/
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

// Recupera il nome dell'utente da firebase, controlla che sia loggato.
// Nel caso non fosse loggato richiama la pagina di login
//fb.onAuthStateChanged_2(baseURL, pageURL)
// Recupera dei dati dalle local storage
let selectedCustomer = localStorage.getItem("global_selected_customer")
let selectedLine 		 = localStorage.getItem("global_selected_cell")
//let entityName			 = localStorage.getItem('global_selected_cell_entityName')
// Recupera l'entity name della thing
let entityName = urlParams.get('entityName')


// Istanzia i grafici dell'attuale e dello storico
// I grafici devono essere istanziati una volta solamente
// La funzione am.createXYChart ha i seguenti parametri di ingresso
// - ID del div che contiene il grafico
// - ID del div che contiene la legenda
// - ID per la colorazione delle series
// - Numero di assi Y associate al GRAFICO
// - Array con le unità di misura
let arrayUM = ['Essicazione', 'Calorie']
let chartActualProduction = am.createXYChart("IDTrendActualProduction", 'IDLegendActualProduzione', 0, 2, arrayUM)
// Crea le series da visualizzare sul grafico
am.createLineSeries(chartActualProduction, "PV - Temperature Ambient", "time", "PV_Temperatura_Ambiente", "°C", 0, false, true)
am.createLineSeries(chartActualProduction, "PV - Temperature", "time", "PV_Temperatura_Cella", "°C", 0, true, false, true)
am.createLineSeries(chartActualProduction, "SP - Temperature", "time", "SP_Temperatura_Cella", "°C", 0, false, false)
am.createLineSeries(chartActualProduction, 'PV - Humidity Ambient', 'time', 'PV_Umidita_Ambiente', '%H', 0, false, true)
am.createLineSeries(chartActualProduction, 'PV - Humidity', 'time', 'PV_Umidita_Cella', '%H', 0, true, false)
am.createLineSeries(chartActualProduction, 'SP - Humidity', 'time', 'SP_Umidita_Cella', '%H', 0, false, false)
am.createLineSeries(chartActualProduction, 'PV - kcal/h', 'time', 'PV_Consumo_Ciclo', 'kcal', 1, false, true)

// Ricalcola la dimensione del div della legenda - viene eseguito ogni secondo
setInterval(am.refreshLegendSize, 1000, chartActualProduction, 'IDLegendActualProduzione')

// Definisce la query da inviare a influxdb
// I parametri da sostituire sono indicati da {1}, {2}, ecc...
// Invece l'entityName è sempre comune per tutte le query
let query  = 'SELECT '
query += 'mean("Dati_Aggiuntivi_Temperatura_Ambiente") as "PV_Temperatura_Ambiente", '
query += 'mean("Dati_Ciclo_Temperatura_PV") as "PV_Temperatura_Cella", '
query += 'mean("Dati_Ciclo_Temperatura_SP") as "SP_Temperatura_Cella", '
query += 'mean("Dati_Aggiuntivi_Umidita_Ambiente") as "PV_Umidita_Ambiente", '
query += 'mean("Dati_Ciclo_Umidita_PV") as "PV_Umidita_Cella", '
query += 'mean("Dati_Ciclo_Umidita_SP") as "SP_Umidita_Cella", '
query += 'mean("Dati_Aggiuntivi_Kcal_Ciclo") as "PV_Consumo_Ciclo" '
query += 'FROM "' + entityName + '" '
query += 'WHERE time > {1}ms and time < {2}ms GROUP BY time(10s) fill(previous)'

// ******************** GRAFICO PRODUZIONE ATTUALE ********************
common.actualDryerProduction(chartActualProduction, query, entityName)

$('#backToPrev').click(function(){
    //let url ='60_cellGrapHistory.html?'+'entityName='+ entityName  +'&timeStart=' + timeStartZoom  + '&timeEnd=' + timeEndZoom
    let url ='./32_dryer_dashboard.html?'+'entityName='+ entityName  
    window.open(url, '_blank')
})

