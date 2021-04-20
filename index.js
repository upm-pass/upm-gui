const node_gtk = require("node-gtk")

const Gtk = node_gtk.require("Gtk", "3.0");
node_gtk.startLoop()

Gtk.init()

const header = new Gtk.HeaderBar()
header.setTitle("test")
header.setSubtitle("test app")
header.setShowCloseButton(true)

const window = new Gtk.Window()
window.windowPosition = Gtk.WindowPosition.CENTER
window.on("destroy", () => Gtk.mainQuit())
window.setDefaultSize(350, 350)
window.setTitlebar(header)
window.borderWidth = 10

window.add(new Gtk.Button({label: "Hello test"}))
window.showAll()

Gtk.main()
