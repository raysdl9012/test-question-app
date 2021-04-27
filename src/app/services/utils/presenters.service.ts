import { Injectable } from '@angular/core';
import { ToastController, LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PresentersService {


  private loading?: HTMLIonLoadingElement;
  private controlShow = false;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }


  /**
   * Funcion en carga de mostrar un toast
   * @param message Mensaje que se quiere mostrart
   * @param time Tiempo de duracion de un toast
   */
  public async showToast(message: string, time = 3000) {
    const toast = await this.toastController.create({
      message: message,
      duration: time
    });
    toast.present();
  }

  /**
   * Funcion que se encarga de mostrar un loding en la pantalla
   * @param message Mensaje que se quiere mostrar mientras se 
   * muestra el loading
   */
  public async showLoading(message = 'Cargando...') {

    if (this.controlShow) return;
    this.loading = await this.loadingController.create({
      message: message
    });
    this.controlShow = true;
    await this.loading.present();
  }

  /**
   * Funcion que se encarga de detener el loading
   */
  public async stopLoading() {
    this.controlShow = false;
    if(!this.loading)return;
    await this.loading.dismiss();
  }
}
