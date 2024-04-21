import{_ as n,o as s,c as a,b as t}from"./app-Zy-6XiuU.js";const p={},e=t(`<h2 id="vue-router-的实现原理" tabindex="-1"><a class="header-anchor" href="#vue-router-的实现原理" aria-hidden="true">#</a> Vue-Router 的实现原理</h2><p>先来看下是怎么使用的：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)</span>

<span class="token comment">// 1. 定义 (路由) 组件。</span>
<span class="token comment">// 可以从其他文件 import 进来</span>
<span class="token keyword">const</span> Foo <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;&lt;div&gt;foo&lt;/div&gt;&#39;</span> <span class="token punctuation">}</span>
<span class="token keyword">const</span> Bar <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;&lt;div&gt;bar&lt;/div&gt;&#39;</span> <span class="token punctuation">}</span>

<span class="token comment">// 2. 定义路由</span>
<span class="token comment">// 每个路由应该映射一个组件。 其中&quot;component&quot; 可以是</span>
<span class="token comment">// 通过 Vue.extend() 创建的组件构造器，</span>
<span class="token comment">// 或者，只是一个组件配置对象。</span>
<span class="token comment">// 我们晚点再讨论嵌套路由。</span>
<span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/foo&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> Foo <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/bar&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> Bar <span class="token punctuation">}</span>
<span class="token punctuation">]</span>

<span class="token comment">// 3. 创建 router 实例，然后传 \`routes\` 配置</span>
<span class="token comment">// 你还可以传别的配置参数, 不过先这么简单着吧。</span>
<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  routes <span class="token comment">// (缩写) 相当于 routes: routes</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 4. 创建和挂载根实例。</span>
<span class="token comment">// 记得要通过 router 配置参数注入路由，</span>
<span class="token comment">// 从而让整个应用都有路由功能</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  router
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// 可在Vue组件使用 this.$router、this.$route</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>从使用方法不难看出以下几点：</strong></p><ol><li><code>VueRouter</code>是一个<code>Vue</code>插件，那么内部就包括一个 <code>install</code> 方法，在插件中要让组件能够获取 <code>$router、$route</code></li><li><code>VueRouter</code>可以<code>new</code>，那么<code>VueRouter</code>就是一个构造函数</li><li>Vue-router还实现了两个组件，并且全局可用： <ul><li><code>router-link</code> 当成 <code>a</code> 标签</li><li><code>router-view</code> 监听路由变化，匹配路由表，渲染匹配到的组件<code>comp</code>，由于<code>router-view</code>可以嵌套， 因此在匹配路由时可能会匹配到多条路由(一个数组)，那么就需要在<code>router-view</code>中向上找 <code>parent</code> 是 <code>router-view</code> 的, 找到以后 <code>depth++</code>，先计算该<code>router-view</code>的嵌套深度，然后再从匹配到的路由中取对应<code>depth</code>的组件进行渲染，然后<code>h(comp)</code></li></ul></li></ol><p><strong>简单实现，只为看清本质：</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">HashHistory</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">router</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">// 将传进来的VueRouter实例保存</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>router <span class="token operator">=</span> router

        <span class="token comment">// 一开始给current赋值初始值</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>current <span class="token operator">=</span> <span class="token function">createRoute</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        <span class="token comment">// 如果url没有 # ，自动填充 /#/</span>
        <span class="token function">ensureSlash</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment">// 监听hash变化</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setupHashLister</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 监听hash的变化</span>
    <span class="token function">setupHashLister</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;hashchange&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">// 传入当前url的hash</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">transitionTo</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>hash<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 跳转路由时触发的函数</span>
    <span class="token function">transitionTo</span><span class="token punctuation">(</span><span class="token parameter">location</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>location<span class="token punctuation">)</span>

        <span class="token comment">// 找出所有对应组件</span>
        <span class="token keyword">let</span> route <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">.</span><span class="token function">createMathcer</span><span class="token punctuation">(</span>location<span class="token punctuation">)</span>

        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span>

        <span class="token comment">// hash更新时给current赋真实值</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>current <span class="token operator">=</span> route
        <span class="token comment">// 同时更新_route</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>cb <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cb</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 监听回调</span>
    <span class="token function">listen</span><span class="token punctuation">(</span><span class="token parameter">cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>cb <span class="token operator">=</span> cb
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 如果浏览器url上没有#，则自动补充/#/</span>
<span class="token keyword">function</span> <span class="token function">ensureSlash</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>hash<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>hash <span class="token operator">=</span> <span class="token string">&#39;/&#39;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createRoute</span><span class="token punctuation">(</span><span class="token parameter">record<span class="token punctuation">,</span> location</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>record<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>record<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            res<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span>record<span class="token punctuation">)</span>
            record <span class="token operator">=</span> record<span class="token punctuation">.</span>parent
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token operator">...</span>location<span class="token punctuation">,</span>
        <span class="token literal-property property">matched</span><span class="token operator">:</span> res
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">VueRouter</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>options <span class="token operator">=</span> options

        <span class="token comment">// 如果不传mode，默认为hash</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>mode <span class="token operator">=</span> options<span class="token punctuation">.</span>mode <span class="token operator">||</span> <span class="token string">&#39;hash&#39;</span>

        <span class="token comment">// 判断模式是哪种</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>mode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token string">&#39;hash&#39;</span><span class="token operator">:</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>history <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashHistory</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
                <span class="token keyword">break</span>
            <span class="token keyword">case</span> <span class="token string">&#39;history&#39;</span><span class="token operator">:</span>
                <span class="token comment">// this.history = new HTML5History(this, options.base)</span>
                <span class="token keyword">break</span>
            <span class="token keyword">case</span> <span class="token string">&#39;abstract&#39;</span><span class="token operator">:</span>

        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">init</span><span class="token punctuation">(</span><span class="token parameter">app</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>history<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">route</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> app<span class="token punctuation">.</span>_route <span class="token operator">=</span> route<span class="token punctuation">)</span>

        <span class="token comment">// 初始化时执行一次，保证刷新能渲染</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>history<span class="token punctuation">.</span><span class="token function">transitionTo</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>hash<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 根据hash变化获取对应的所有组件</span>
    <span class="token function">createMathcer</span><span class="token punctuation">(</span><span class="token parameter">location</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> pathMap <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">createRouteMap</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span>routes<span class="token punctuation">)</span>

        <span class="token keyword">const</span> record <span class="token operator">=</span> pathMap<span class="token punctuation">[</span>location<span class="token punctuation">]</span>
        <span class="token keyword">const</span> local <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span> location
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>record<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">createRoute</span><span class="token punctuation">(</span>record<span class="token punctuation">,</span> local<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">createRoute</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> local<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> _Vue
VueRouter<span class="token punctuation">.</span><span class="token function-variable function">install</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    _Vue <span class="token operator">=</span> Vue
    <span class="token comment">// 使用Vue.mixin混入每一个组件</span>
    Vue<span class="token punctuation">.</span><span class="token function">mixin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token comment">// 在每一个组件的beforeCreate生命周期去执行</span>
        <span class="token function">beforeCreate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$options<span class="token punctuation">.</span>router<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 如果是根组件</span>
                <span class="token comment">// this 是 根组件本身</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>_routerRoot <span class="token operator">=</span> <span class="token keyword">this</span>

                <span class="token comment">// this.$options.router就是挂在根组件上的VueRouter实例</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>$router <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$options<span class="token punctuation">.</span>router

                <span class="token comment">// 执行VueRouter实例上的init方法，初始化</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>

                <span class="token comment">// 相当于存在_routerRoot上，并且调用Vue的defineReactive方法进行响应式处理</span>
                Vue<span class="token punctuation">.</span>util<span class="token punctuation">.</span><span class="token function">defineReactive</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">&#39;_route&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span>history<span class="token punctuation">.</span>current<span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">// 非根组件，也要把父组件的_routerRoot保存到自身身上</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>_routerRoot <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$parent <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$parent<span class="token punctuation">.</span>_routerRoot
                <span class="token comment">// 子组件也要挂上$router</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>$router <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_routerRoot<span class="token punctuation">.</span>$router
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span><span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token string">&#39;$route&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_routerRoot<span class="token punctuation">.</span>_route
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">createRouteMap</span><span class="token punctuation">(</span><span class="token parameter">routes</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">const</span> pathList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">const</span> pathMap <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// 对传进来的routes数组进行遍历处理</span>
    routes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">route</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">addRouteRecord</span><span class="token punctuation">(</span>route<span class="token punctuation">,</span> pathList<span class="token punctuation">,</span> pathMap<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>pathList<span class="token punctuation">)</span>
    <span class="token comment">// [&quot;/home&quot;, &quot;/home/child1&quot;, &quot;/home/child2&quot;, &quot;/hello&quot;, &quot;/hello/child1&quot;]</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>pathMap<span class="token punctuation">)</span>
    <span class="token comment">// {</span>
    <span class="token comment">//     /hello: {path: xxx, component: xxx, parent: xxx },</span>
    <span class="token comment">//     /hello/child1: {path: xxx, component: xxx, parent: xxx },</span>
    <span class="token comment">//     /hello/child2: {path: xxx, component: xxx, parent: xxx },</span>
    <span class="token comment">//     /home: {path: xxx, component: xxx, parent: xxx },</span>
    <span class="token comment">//     /home/child1: {path: xxx, component: xxx, parent: xxx }</span>
    <span class="token comment">// }</span>

    <span class="token comment">// 将pathList与pathMap返回</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        pathList<span class="token punctuation">,</span>
        pathMap
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">addRouteRecord</span><span class="token punctuation">(</span><span class="token parameter">route<span class="token punctuation">,</span> pathList<span class="token punctuation">,</span> pathMap<span class="token punctuation">,</span> parent</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 拼接path</span>
    <span class="token keyword">const</span> path <span class="token operator">=</span> parent <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>parent<span class="token punctuation">.</span>path<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>route<span class="token punctuation">.</span>path<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span> <span class="token operator">:</span> route<span class="token punctuation">.</span>path
    <span class="token keyword">const</span> <span class="token punctuation">{</span> component<span class="token punctuation">,</span> children <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token punctuation">}</span> <span class="token operator">=</span> route
    <span class="token keyword">const</span> record <span class="token operator">=</span> <span class="token punctuation">{</span>
        path<span class="token punctuation">,</span>
        component<span class="token punctuation">,</span>
        parent
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>pathMap<span class="token punctuation">[</span>path<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        pathList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
        pathMap<span class="token punctuation">[</span>path<span class="token punctuation">]</span> <span class="token operator">=</span> record
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>children<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果有children，则递归执行addRouteRecord</span>
        children<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">child</span> <span class="token operator">=&gt;</span> <span class="token function">addRouteRecord</span><span class="token punctuation">(</span>child<span class="token punctuation">,</span> pathList<span class="token punctuation">,</span> pathMap<span class="token punctuation">,</span> record<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">createRoute</span><span class="token punctuation">(</span><span class="token parameter">record<span class="token punctuation">,</span> location</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>record<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>record<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            res<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span>record<span class="token punctuation">)</span>
            record <span class="token operator">=</span> record<span class="token punctuation">.</span>parent
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token operator">...</span>location<span class="token punctuation">,</span>
        <span class="token literal-property property">matched</span><span class="token operator">:</span> res
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现Router-Link</span>
<span class="token keyword">const</span> Link <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">to</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
    <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">h</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>
      <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">attrs</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">&#39;#&#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>to<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>$slots<span class="token punctuation">.</span>default<span class="token punctuation">]</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> View <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">functional</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">h<span class="token punctuation">,</span> <span class="token punctuation">{</span> parent<span class="token punctuation">,</span> data <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> matched <span class="token punctuation">}</span> <span class="token operator">=</span> parent<span class="token punctuation">.</span>$route

      data<span class="token punctuation">.</span>routerView <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token comment">// 标识此组件为router-view</span>
      <span class="token keyword">let</span> depth <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">// 深度索引</span>

      <span class="token keyword">while</span><span class="token punctuation">(</span>parent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 如果有父组件且父组件为router-view 说明索引需要加1</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>parent<span class="token punctuation">.</span>$vnode <span class="token operator">&amp;&amp;</span> parent<span class="token punctuation">.</span>$vnode<span class="token punctuation">.</span>data<span class="token punctuation">.</span>routerView<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              depth<span class="token operator">++</span>
          <span class="token punctuation">}</span>
          parent <span class="token operator">=</span> parent<span class="token punctuation">.</span>$parent
      <span class="token punctuation">}</span>
      <span class="token keyword">const</span> record <span class="token operator">=</span> matched<span class="token punctuation">[</span>depth<span class="token punctuation">]</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>record<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">const</span> component <span class="token operator">=</span> record<span class="token punctuation">.</span>component

      <span class="token comment">// 使用render的h函数进行渲染组件</span>
      <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>component<span class="token punctuation">,</span> data<span class="token punctuation">)</span>

  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> VueRouter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","Vue-Router deshixianyuanli.html.vue"]]);export{r as default};
