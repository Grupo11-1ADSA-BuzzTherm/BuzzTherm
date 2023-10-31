#include "DHT.h"
#define dht_type DHT11
int dht_pin = A0;
DHT dht_11 = DHT(dht_pin, dht_type);

void setup()
{
Serial.begin(9600);
dht_11.begin();
}
void loop()
{
float umidade = dht_11.readHumidity();
float temperatura = dht_11.readTemperature();
umidade = 0.333 * umidade + 36.68;
temperatura = 1.5 * temperatura - 5;

if (isnan(temperatura) or isnan(umidade))
{
Serial.println("Erro ao ler o DHT");
}
else
{
Serial.print(umidade);
Serial.print(";");
Serial.println(temperatura);

}

delay(2000);
}
