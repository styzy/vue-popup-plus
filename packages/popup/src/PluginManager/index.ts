export type Plugin = { name: string; install: Function }

export class PluginManager {
	static #plugins: { [key: string]: Plugin } = {}
	static get(name: string): Plugin | void {
		return this.#plugins[name]
	}
	static use(plugin: Plugin) {
		if (this.get(plugin.name))
			throw new Error(`Popup: exist plugin name: ${plugin.name}`)
		this.#plugins[plugin.name] = plugin
		plugin.install()
	}
}
