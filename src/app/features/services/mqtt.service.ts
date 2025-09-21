import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Client, Message } from 'paho-mqtt';

@Injectable({ providedIn: 'root' })
export class MqttService {
  private client!: Client;
  private reconnectTimeout: any;
  private readonly RECONNECT_INTERVAL = 5000; // 5 segundos

  public statusConexao = new BehaviorSubject<boolean>(false);
  public mensagemRecebida = new Subject<{ eventType: string; log: { name: string } }>();

  connect() {
    const host = 'test.mosquitto.org';
    const port = 8081; // pode trocar para 8080 se der problema
    const clientId = 'angular-' + Math.random();

    this.client = new Client(host, port, clientId);

    this.client.onConnectionLost = () => {
      this.statusConexao.next(false);
      console.warn('[MQTT] Conexão perdida, tentando reconectar...');
      this.reconnect();
    };

    this.client.onMessageArrived = (msg: any) => {
      try {
        const data = JSON.parse(msg.payloadString);

        if (data.eventType === 'empty') {
          console.log('Mensagem vazia recebida');
          return;
        }

        this.mensagemRecebida.next(data);
      } catch (e) {
        console.error('Erro ao parsear mensagem MQTT:', e, msg.payloadString);
      }
    };

    this.tryConnect();
  }

  private tryConnect() {
    this.client.connect({
      useSSL: true,
      timeout: 5,
      onSuccess: () => {
        this.statusConexao.next(true);
        console.log('[MQTT] Conectado!');
        this.client.subscribe('rfid/entrada');
        this.client.subscribe('rfid/saida');
      },
      onFailure: (err: any) => {
        this.statusConexao.next(false);
        console.error('[MQTT] Falha ao conectar:', err);
        this.reconnect();
      }
    });
  }

  private reconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    this.reconnectTimeout = setTimeout(() => {
      console.log('[MQTT] Tentando reconectar...');
      this.tryConnect();
    }, this.RECONNECT_INTERVAL);
  }

  publish(topic: string, msg: string) {
    const message = new Message(msg);
    message.destinationName = topic;
    this.client.send(message);
  }
}
