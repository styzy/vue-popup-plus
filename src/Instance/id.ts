/**
 * 实例 id 接口
 */
export interface PopupInstanceId {
	/**
	 * 生成该实例 id 的种子
	 * @internal
	 */
	seed: Readonly<number>
	/**
	 * 实例 id 名称
	 */
	name: Readonly<string>
}

export class InstanceId implements PopupInstanceId {
	#seed: number
	get seed() {
		return this.#seed
	}
	get name() {
		return `vue-popup-instance-${this.seed}`
	}
	constructor(seed: number) {
		this.#seed = seed
	}
}
