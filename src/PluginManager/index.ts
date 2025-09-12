export type VuePopupPlusPlugin = { name: string; install: Function }

export class VuePopupPlusPluginManager {
	static #plugins: { [key: string]: VuePopupPlusPlugin } = {}
	static get(name: string): VuePopupPlusPlugin | undefined {
		return this.#plugins[name]
	}
	static use(plugin: VuePopupPlusPlugin) {
		if (this.get(plugin.name))
			throw new Error(`Popup: exist plugin name: ${plugin.name}`)
		this.#plugins[plugin.name] = plugin
		plugin.install()
	}
}
