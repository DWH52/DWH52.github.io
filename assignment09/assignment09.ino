/*

*/
int buttonState1 = 0;
int buttonState2 = 0;
bool sequenceSwitcher1 = false;
bool sequenceSwitcher2 = false;

void setup()
{
    pinMode(LED_BUILTIN, OUTPUT);
    pinMode(12, OUTPUT);
    pinMode(8, INPUT);
    pinMode(7, INPUT);
}

void loop()
{
  //Random Blinking for Built-in LED
  
  buttonState1 = digitalRead(8);
  buttonState2 = digitalRead(7);
  
  sequenceSwitcher1 = false;
  sequenceSwitcher2 = false;
  if(buttonState1 == HIGH)
  {
    sequenceSwitcher1 = true;
    buttonState1 = LOW;
  }
  
  if(buttonState2 == HIGH)
  {
    sequenceSwitcher2 = true;
    buttonState2 = LOW;
  }
  
  if(sequenceSwitcher1)
  {
    for(int i = 0; i < 20; i++)
    {
      int delayTime1 = random(1000);
      digitalWrite(LED_BUILTIN, HIGH);
      delay(delayTime1);
      digitalWrite(LED_BUILTIN, LOW);
      delay(delayTime1);
    }
    sequenceSwitcher1 = !sequenceSwitcher1;
    sequenceSwitcher2 = false;
  }
  
  if(sequenceSwitcher2)
  {
    for(int i = 0; i < 5; i++)
    {
      int delayTime2 = random(1000);
      digitalWrite(12, HIGH);
      delay(delayTime2);
      digitalWrite(12, LOW);
      delay(delayTime2);
    }
    sequenceSwitcher2 = !sequenceSwitcher2;
    sequenceSwitcher1 = false;
  }
  
}