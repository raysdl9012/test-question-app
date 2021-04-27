import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HTTP_METHODS, END_POINTS } from 'src/app/enums/e.request';


@Injectable({
  providedIn: 'root'
})

export class RequestService {


  constructor(private http: HttpClient) {
  }

  /**
   * Funcion que se encarga de solicitar una peticion HTTP
   * @param method Metodo que se va a implementar GET, POST, PUT, DELETE
   * @param endPoint Endpoint a donde se va a realizar la peticion
   * @param body cuerpo del mensaje
   * @param query Query que van en la url
   */
  public makeRequest(method: HTTP_METHODS, endPoint: END_POINTS, body?: any, query: string = ''): Promise<any> {
    const url = `${environment.host}${endPoint}${query}`;
    const request = new HttpRequest(
      method,
      url,
      JSON.stringify(body),
    );

    if (!environment.production) {
      console.log('Body', body);
      console.log('url', url);
      console.log('method', method);
    }
    return this.http.request(request).pipe(timeout(140000)).toPromise();
  }
}
