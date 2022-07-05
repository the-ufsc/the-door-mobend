// echo d5
// trigo d6
// servo d4

#include <Servo.h>

// motor
Servo porta;
#define PIN_SERVO 4

// sensor
const int PIN_TRIG = 12;
const int PIN_ECHO = 14;

// variaveis de conversao
#define SOUND_VELOCITY 0.034
#define CM_TO_INCH 0.393701

// variaveis do sistema
int posPort = 0;
long soundDuration = 0;
float distanceCm = 0;
int distanceOpen = 50;

void setup()
{
  Serial.begin(115200);
  porta.attach(PIN_SERVO);
  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
}

void loop()
{
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);

  soundDuration = pulseIn(PIN_ECHO, HIGH);

  // Calculate the distance
  distanceCm = soundDuration * SOUND_VELOCITY / 2;
  Serial.println(distanceCm);

  if (distanceCm < distanceOpen)
  {
    posPort = 0;
  }
  else
  {
    posPort = 180;
  }

  porta.write(posPort);
  delay(500);
}