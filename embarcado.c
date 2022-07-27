#include <Servo.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <Arduino_JSON.h>
// motor
Servo porta;
#define PIN_SERVO 4

// sensor
const int PIN_TRIG = 12;
const int PIN_ECHO = 14;

// variaveis de conversao
#define SOUND_VELOCITY 0.034
#define CM_TO_INCH 0.393701

const String API_URL = "http://192.168.0.102:5000";

// wifi
const String WIFI_SSD = "ole telecom.132145";
const String WIFI_PASSW = "33305300";

// variaveis do sistema
int countExec = 0;
long soundDuration = 0;
float distanceCm = 0;

// Id Backend
const int doorCode = 5; // defina o codigo dessa placa
String doorID = "";     // id do back

// variaveis API
int distanceOpen = 0;
int openDegree = 0;
int closeDegree = 0;
String initialPosition = "";
boolean isActivated = false;
String initialHourWorking = "";
String endHourWorking = "";

WiFiClient client;
HTTPClient http;

void setup()
{
  Serial.begin(115200);
  Serial.println("Hello Moto");
  porta.attach(PIN_SERVO);
  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);

  Serial.print("Conectando wifi.");

  WiFi.begin(WIFI_SSD, WIFI_PASSW);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Ok!");
  getData();
}

void sendLog(String actionaaa)
{
  String link = API_URL + "/doors/code/" + doorID;
  Serial.println(link);
  http.begin(client, link);
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(("{ \"action\": \"Hello\" }"));
  if (httpCode > 0)
  {
    Serial.println("Enviado com sucesso!");
  }
  else
  {
    Serial.println("Erro ao enviar");
  }
  Serial.println(httpCode);
}

void getData()
{
  String link = API_URL + "/doors/code/" + "62e1036b2185101f91b6424f";
  Serial.println("Carregando data...");
  http.begin(client, link);
  int httpResponseCode = http.GET();
  if (httpResponseCode > 0)
  {
    JSONVar response = JSON.parse(http.getString());
    doorID = removeMark(JSON.stringify(response["_id"]));
    distanceOpen = (JSON.stringify(response["distanceOpen"])).toInt();
    openDegree = (JSON.stringify(response["openDegree"])).toInt();
    closeDegree = (JSON.stringify(response["closeDegree"])).toInt();
    initialPosition = removeMark(JSON.stringify(response["initialPosition"]));

    String isActivatedResp = JSON.stringify(response["isActivated"]);
    if (isActivatedResp == "false")
    {
      isActivated = false;
    }
    else
    {
      isActivated = true;
    }
    Serial.println("Atualizado com sucesso.");
  }
  else
  {
    Serial.println("Error http");
  }
}

// variavel vem com "aspas" da API, temos que tirar p/ usar.
String removeMark(String x)
{
  String final;
  final = x;
  int len = x.length();
  final.remove(len - 1, 1);
  final.remove(0, 1);
  return final;
}

void loop()
{
  countExec += 1;
  if (countExec % 5 == 0)
  {
    // getData();
    sendLog("aaa");
  }
  if (isActivated)
  {
    digitalWrite(PIN_TRIG, LOW);
    delayMicroseconds(2);
    digitalWrite(PIN_TRIG, HIGH);
    delayMicroseconds(10);
    digitalWrite(PIN_TRIG, LOW);

    soundDuration = pulseIn(PIN_ECHO, HIGH);

    // calcular a distancia (pulsos to cm)
    distanceCm = soundDuration * SOUND_VELOCITY / 2;
    Serial.println(distanceCm);

    if (distanceCm < distanceOpen)
    {
      porta.write(openDegree);
    }
    else
    {
      porta.write(closeDegree);
    }
  }
  else
  {
    Serial.print("Porta está parada no modo: ");
    Serial.println(initialPosition);
    if (initialPosition == "open")
    {
      porta.write(openDegree);
      Serial.println("01");
    }
    else
    {
      porta.write(closeDegree);
      Serial.println("02");
    }
  }

  delay(1000);
}