## Setup forever

- `sudo nano /start`
- Add following lines:

```
sudo forever stopall
cd /home/pi/beacon-monitoring
sudo su pi -c 'git fetch --all'
git reset --hard origin/master
sudo DEVICE="GATEWAY 1" forever start index.js
```

- Change permissions: `sudo chmod +x /start`
- `sudo nano /etc/rc.local` and add this line `sudo sh /start`
- restart Raspberry

## Setup Dataplicity

- Run instalation script `curl https://www.dataplicity.com/yliuqcp4.py | sudo python`
- Enable warm hole and set it to `http://homoky-termostat-device.dataplicity.io/`

# Connect Relay 5V

## Control side

- `UCC` - pin 2
- `GND` - pin 6
- `IN` - pin 40

## Controlling side

- `COM` - connect cable under voltage (check manual of your device)
- `NO` (normaly open - opened via Raspberry Pi) - connect cable for step-by-step (check manual of your device)
- `NC` (normaly closed - at default) - do not use this one

# Credentials

- [HAP-NodeJS](https://github.com/KhaosT/HAP-NodeJS)
- [(RPi) Wait For Network at Boot](<https://github.com/legotheboss/YouTube-files/wiki/(RPi)-Wait-For-Network-at-Boot>)
- [Start HAP on Reboot](<https://github.com/legotheboss/YouTube-files/wiki/(RPi)-Start-HAP-on-Reboot>)
- [Onoff](https://github.com/fivdi/onoff#gpiogpio-direction--edge--options) for controlling GPIO
