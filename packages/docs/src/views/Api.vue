<template>
  <div class="api-container">
    <h1>API 参考</h1>

    <section class="api-section">
      <h2>核心方法</h2>
      
      <div class="api-item">
        <h3>createPopup(options?)</h3>
        <p>创建一个弹出层控制器实例，该实例需要通过 app.use() 安装到Vue实例上才能使用。</p>
        <h4>参数</h4>
        <table class="api-table">
          <thead>
            <tr>
              <th>参数名</th>
              <th>类型</th>
              <th>默认值</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>options</td>
              <td>CoreOptions</td>
              <td>{}</td>
              <td>弹出层核心配置选项</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="api-item">
        <h3>usePopup()</h3>
        <p>获取弹出层控制器实例。</p>
        <h4>返回值</h4>
        <p>PopupController - 弹出层控制器实例</p>
      </div>
    </section>

    <section class="api-section">
      <h2>PopupController 接口</h2>
      
      <div class="api-item">
        <h3>render(options)</h3>
        <p>渲染弹出层，返回弹出层实例id，可调用destroy(id)方法销毁弹出层。</p>
        <h4>参数</h4>
        <table class="api-table">
          <thead>
            <tr>
              <th>参数名</th>
              <th>类型</th>
              <th>必填</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>options</td>
              <td>RenderOptions</td>
              <td>是</td>
              <td>渲染参数</td>
            </tr>
          </tbody>
        </table>
        <h4>返回值</h4>
        <p>InstanceId - 弹出层实例id</p>
      </div>
      
      <div class="api-item">
        <h3>update(instanceId, options)</h3>
        <p>更新弹出层，可更新弹出层参数。</p>
        <h4>参数</h4>
        <table class="api-table">
          <thead>
            <tr>
              <th>参数名</th>
              <th>类型</th>
              <th>必填</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>instanceId</td>
              <td>InstanceId</td>
              <td>是</td>
              <td>弹出层实例id</td>
            </tr>
            <tr>
              <td>options</td>
              <td>UpdateOptions</td>
              <td>是</td>
              <td>更新参数</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="api-item">
        <h3>destroy(instanceId, payload?)</h3>
        <p>销毁弹出层。</p>
        <h4>参数</h4>
        <table class="api-table">
          <thead>
            <tr>
              <th>参数名</th>
              <th>类型</th>
              <th>必填</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>instanceId</td>
              <td>InstanceId</td>
              <td>是</td>
              <td>弹出层实例id</td>
            </tr>
            <tr>
              <td>payload</td>
              <td>any</td>
              <td>否</td>
              <td>自定义负载参数，会作为参数传递给创建弹出层时的onUnmounted回调函数</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="api-section">
      <h2>类型定义</h2>
      
      <div class="api-item">
        <h3>CoreOptions</h3>
        <p>弹出层核心配置选项。</p>
        <pre class="code-block"><code>type CoreOptions = {
  /**
   * 弹出层 zIndex 基础值，默认为1000
   * 每次生成弹出层时，除非 render() 方法传入 zIndex
   * 否则使用此基础值，每次使用后会自动递增
   */
  zIndex?: number
  /**
   * 弹出层控制器挂载在 Vue 实例上的属性名，默认为 $popup
   */
  prototypeName?: string
}</code></pre>
      </div>
      
      <div class="api-item">
        <h3>RenderOptions</h3>
        <p>渲染弹出层的配置选项。</p>
        <pre class="code-block"><code>type RenderOptions = {
  // 弹出层渲染的组件
  component: Component
  // 传递给组件的属性
  componentProps?: Record&lt;string, any&gt;
  // 弹出层的样式
  width?: string | number
  maxWidth?: string | number
  minWidth?: string | number
  height?: string | number
  maxHeight?: string | number
  minHeight?: string | number
  // 动画效果
  animationDuration?: number
  maskAnimation?: Animation
  viewAnimation?: Animation
  // 是否显示遮罩层
  mask?: boolean
  // 点击遮罩层是否关闭弹窗
  maskClickCloseEnabled?: boolean
  // 是否自动隐藏窗口滚动条
  autoHideWindowScroll?: boolean
  // 生命周期钩子
  onMounted?: () => void
  onUnmounted?: (payload?: any) => void
}</code></pre>
      </div>
      
      <div class="api-item">
        <h3>UpdateOptions</h3>
        <p>更新弹出层的配置选项。</p>
        <pre class="code-block"><code>type UpdateOptions = Partial&lt;
  Omit&lt;RenderOptions, 'component' | 'el' | 'autoHideWindowScroll'&gt;
&gt;</code></pre>
      </div>
      
      <div class="api-item">
        <h3>POPUP_ANIMATIONS</h3>
        <p>内置动画效果。</p>
        <pre class="code-block"><code>const POPUP_ANIMATIONS = {
  // 无动画
  NONE: Symbol('none'),
  // 淡入淡出
  FADE: Symbol('fade'),
  // 缩放放大
  SCALE_ENLARGE: Symbol('scale-enlarge'),
  // 缩放缩小
  SCALE_SHRINK: Symbol('scale-shrink'),
  // 从顶部飞入
  FLY_TOP: Symbol('fly-top'),
  // 从底部飞入
  FLY_BOTTOM: Symbol('fly-bottom'),
  // 从左侧飞入
  FLY_LEFT: Symbol('fly-left'),
  // 从右侧飞入
  FLY_RIGHT: Symbol('fly-right'),
  // 组合动画：淡入淡出
  FADE_IN_OUT: Symbol('fade'),
  // 组合动画：缩放
  SCALE_IN_OUT: Symbol('scale-enlarge'),
  // 组合动画：滑动
  SLIDE_IN_OUT: Symbol('fly-bottom')
}</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Api' })
</script>

<style scoped>
.api-container {
  max-width: 900px;
  margin: 0 auto;
}

.api-section {
  margin-bottom: 3rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--primary-color);
}

h2 {
  font-size: 1.8rem;
  margin: 1.5rem 0 1rem;
}

h3 {
  font-size: 1.4rem;
  margin: 1.5rem 0 0.5rem;
  color: var(--primary-color);
}

h4 {
  font-size: 1.1rem;
  margin: 1rem 0 0.5rem;
}

.api-item {
  margin-bottom: 2rem;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.api-table th,
.api-table td {
  padding: 0.5rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.api-table th {
  font-weight: bold;
  background-color: var(--code-bg-color);
}

.code-block {
  background-color: var(--code-bg-color);
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  margin: 1rem 0;
}

code {
  font-family: var(--code-font-family);
  font-size: 0.9rem;
}
</style>