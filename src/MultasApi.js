
class MultasApi{
    static API_BASE_URL = "/api/v1";
  //  static API_KEY_MONGO = (process.env.API_KEY);

    static requestHeaders(){
        return{}
    }

    static getAllMultas(){
        const headers = this.requestHeaders();
        const request = new Request(MultasApi.API_BASE_URL + "/multas?apikey=dd94326d-dd29-448d-85d6-7bb335eb9151",{
            method: 'GET',
            headers:headers
        });

        return fetch(request).then(response =>{
            return response.json();
        });
    }

    static addMulta(multa,dni,concepto,puntos,importe) {
    
        const request = new Request(MultasApi.API_BASE_URL + "/multas",{
            method: 'POST',
            body: JSON.stringify({dni:dni, concepto: concepto, puntos: puntos ,importe: importe}),
            headers: {
                'Content-Type' : 'application/json',
            }
        });

        return fetch(request).then(response =>{
            return response.json();

        });

    }

    static deleteMulta(multa,_id) {
      
        const request = new Request(MultasApi.API_BASE_URL + "/multas/" + multa._id,{ 
            method: 'DELETE',
        //    path: _id,
            headers: {
                'Content-Type' : 'text/plain; charset=utf-8',
            }
        });

        return fetch(request).then(response =>{
            return response.json();
        });
    }

    static updateMulta(multa,_id) {
      
        const request = new Request(MultasApi.API_BASE_URL + "/multas/editar/" + multa._id,{ 
            method: 'PUT',
            path: _id,
            body: JSON.stringify({_id:_id, dni:multa.dni, concepto: multa.concepto, puntos: multa.puntos ,importe: multa.importe}),
            headers: {
                'Content-Type' : 'application/json',
            }
        });

        return fetch(request).then(response =>{
            return response.json();
        });
    }

}

export default MultasApi;