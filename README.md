# upm-gui ( uwu password manager )

## **Overview**
upm is a free open source offline password manager, which helps you to manage your passwords, You can store all your passwords in one database, which is locked with a master key so you only have to remember one single master key to unlock the whole database

## **Table of contents**
1. [**installation**](#Installation)
    * [**linux**](#linux)
    * [**windows**](#windows)
2. [**hotkeys**](#hotkeys)
3. [**settings**](#settings)

## **Installation**
Installation guide for upm (uwu password manager)

### **Linux**

```bash
$ git clone https://github.com/upm-pass/upm-gui.git
```

cd project directory 
```bash 
$ cd upm-gui/
```

to install upm-gui run
```bash
$ ./install.sh
```
After that run gupm from your terminal or application launcher


### **windows**
- coming soon

<br>

## **Hotkeys**

| Action                                      |   Shortcut
| --------------------------------------------|:-----------------------------
| focus on search bar                         | <kbd>ctrl</kbd>+<kbd>f</kbd>
| add new password                            | <kbd>ctrl</kbd>+<kbd>d</kbd>


<br>

## **Settings**

## Config file path:
#### **Linux**:
    /home/$USER/.config/upm/config

#### **Windows**:
    ?

## **default settings**
```json
{
    "settings": {
        "notification_position": "top_right"
    }
}
```
## **Available options**
| name                  | options
| ----------------------|:------------------
| notification_position | top_right, top_left

