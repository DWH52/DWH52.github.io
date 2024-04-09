/*
2 Player Game: Dim and Dimmer.

Objective: Get the brightest light without going over!

Rules: Starting with the potentiometer at the default (zeroed) position,
each player takes a turn to turn the potentiometer clockwise as much as they want. 
When they decide they no longer want to turn it, they pass play to the next
player who must then continue to turn it clockwise (in the positive direction) 
however much they want. Play continues until a loser is decided!

Challenge: The first player to go over the value that makes the
LED the brightest, and turns off the LED, loses!

Interaction: Turn a potentiometer, observe the LED for the status.
*/
const int analogInPin = A0;
const int analogOutPin = 3;

int sensorValue = 0;
int outputValue = 0;
int randomValue = random(500,900);
bool gameOver = false;

void setup() 
{
  pinMode(8, OUTPUT);
  pinMode(12, OUTPUT);
}

void loop() 
{
  sensorValue = analogRead(analogInPin);


  //Serial.println(outputValue);
  if(sensorValue >= randomValue)
  {
    digitalWrite(8,HIGH);
    tone(12, 330, 500);
    pinMode(analogOutPin, OUTPUT);
    digitalWrite(analogOutPin, LOW);
    gameOver = true;
  }
  else
  {
    outputValue = map(sensorValue, 0, 1023, 0, randomValue);
    analogWrite(analogOutPin, outputValue);
  }
  if(gameOver == true)
  {
    if(sensorValue == 0)
    {
      gameOver = false;
      int sensorValue = 0;
      int outputValue = 0;
      digitalWrite(8,LOW);
    }
  }
}