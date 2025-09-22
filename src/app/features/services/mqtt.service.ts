import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Client, Message } from 'paho-mqtt';

@Injectable({ providedIn: 'root' })
export class MqttService {
  private client!: Client;
  public statusConexao = new BehaviorSubject<boolean>(false);
  public mensagemRecebida = new Subject<{ eventType: string; log: any }>();
  private conectado = false;

  connect() {
    if (this.conectado) return; // ⚡ evita conexão duplicada
    this.conectado = true;

    const host = 'test.mosquitto.org';
    const port = 8081;
    const clientId = 'angular-' + Math.random();

    this.client = new Client(host, port, clientId);

    this.client.onConnectionLost = () => this.statusConexao.next(false);

    this.client.onMessageArrived = (msg: any) => {
      try {
        const data = JSON.parse(msg.payloadString);
        if (data.eventType) {
          this.mensagemRecebida.next(data);
        }
      } catch (e) {
        console.error('Erro ao processar mensagem MQTT', e, msg.payloadString);
      }
    };

    this.client.connect({
      useSSL: true,
      onSuccess: () => {
        this.statusConexao.next(true);
        console.log('[MQTT] Conectado!');
        this.client.subscribe('rfid/entrada');
        this.client.subscribe('rfid/saida');
      },
      onFailure: (err: any) => {
        this.statusConexao.next(false);
        console.error('[MQTT] Falha ao conectar:', err);
      }
    });
  }

  publish(topic: string, msg: string) {
    const message = new Message(msg);
    message.destinationName = topic;
    this.client.send(message);
  }
}
