class PuntosApi{
    static API_BASE_URL = "https://cors-anywhere.herokuapp.com/https://api-puntos-dgt.herokuapp.com/api/v1" 
    static requestHeaders(){
        return{}
    }

    static restarPuntos(dni, npuntos){
         /*const headers = this.requestHeaders();  */
        
           const request = new Request(PuntosApi.API_BASE_URL + "/puntos/" + dni + "/multa?npuntos=" + npuntos, {  
            method: 'POST',
            headers: {'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih'}  
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }
}

export default PuntosApi;