import{_ as e,o as d,c as i,b as n}from"./app-Zy-6XiuU.js";const l={},t=n(`<h2 id="事件模型" tabindex="-1"><a class="header-anchor" href="#事件模型" aria-hidden="true">#</a> 事件模型</h2><h3 id="什么是事件" tabindex="-1"><a class="header-anchor" href="#什么是事件" aria-hidden="true">#</a> 什么是事件？</h3><p>事件是用户操作网页时发生的交互动作，比如 <code>click</code>， 事件除了用户触发的动作外，还可以是文档加载，窗口滚动和大小调整。事件被封装成一个 <code>event</code> 对象，包含了该事件发生时的所有相关信息（ <code>event</code> 的属性）以及可以对事件进行的操作（ <code>event</code> 的方法）。事件是用户操作网页时发生的交互动作或者网页本身的一些操作，现代浏览器一共有三种事件模型。</p><h3 id="dom0-级事件模型" tabindex="-1"><a class="header-anchor" href="#dom0-级事件模型" aria-hidden="true">#</a> DOM0 级事件模型</h3><p>这种模型不会传播，所以没有事件流的概念，但是现在有的浏览器支持以冒泡的方式实现，它可以在网页中直接定义。监听函数，也可以通过 <code>js</code> 属性来指定监听函数。所有浏览器都兼容这种方式。直接在 <code>dom</code> 对象上注册事件名称。</p><p>文字太干不想看？那么看下面的例子：</p><p>html</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;body onclick=&quot;console.log(&#39;body&#39;)&quot;&gt;
  &lt;ul onclick=&quot;console.log(&#39;ul&#39;)&quot;&gt;
    &lt;li onclick=&quot;console.log(&#39;li&#39;)&quot;&gt;1&lt;/li&gt;
  &lt;/ul&gt;
&lt;/body&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>点击 <code>li</code> 元素，将依次打印: <code>li =&gt; ul =&gt; body</code>，像这种直接在HTML元素上通过<code>onxxx</code>定义事件监听就是 <code>DOM0</code> 级事件模型, 不要再项目中这么干！</p><h3 id="ie-事件模型" tabindex="-1"><a class="header-anchor" href="#ie-事件模型" aria-hidden="true">#</a> IE 事件模型</h3><p>在该事件模型中，一次事件共有两个过程，事件处理阶段和事件冒泡阶段。事件处理阶段会首先执行目标元素绑定的监听事件。然后是事件冒泡阶段，冒泡指的是事件从目标元素冒泡到document，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。这种模型通过 <code>attachEvent</code> 来添加监听函数，可以添加多个监听函数，会按顺序依次执行。</p><p>还是来一个例子：</p><p>html</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;body&gt;
  &lt;ul&gt;
    &lt;li id=&quot;liid&quot;&gt;1&lt;/li&gt;
  &lt;/ul&gt;
  &lt;script&gt;
    const body = document.querySelector(&#39;body&#39;)
    const ul = document.querySelector(&#39;ul&#39;)
    const li = document.getElementById(&#39;liid&#39;)
    body.attachEvent(&#39;onclick&#39;, () =&gt; console.log(&#39;body&#39;))
    ul.attachEvent(&#39;onclick&#39;, () =&gt; console.log(&#39;ul&#39;))
    li.attachEvent(&#39;onclick&#39;, () =&gt; console.log(&#39;li&#39;))
  &lt;/script&gt;
&lt;/body&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://mp-cb2e47ef-a802-469a-a81c-2b6efa9f8b60.cdn.bspapp.com/blog-resource/images/dom1-event.png" alt="img"></p><p>点击 <code>li</code> 元素，将依次打印: <code>li =&gt; ul =&gt; body</code>，这种通过<code>attachEvent</code>定义事件监听就是 <code>IE</code> 事件模型。</p><h3 id="dom2-级事件模型" tabindex="-1"><a class="header-anchor" href="#dom2-级事件模型" aria-hidden="true">#</a> DOM2 级事件模型</h3><p>在该事件模型中，一次事件共有三个过程，第一个过程是事件捕获阶段。捕获指的是事件从 <code>document</code> 一直向下传播到目标元素，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。后面两个阶段和 <code>IE</code> 事件模型的两个阶段相同。这种事件模型，事件绑定的函数是 <code>addEventListener</code>，其中第三个参数可以指定事件是否在捕获阶段执行。 还是来一个例子：</p><p>html</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;body&gt;
  &lt;ul&gt;
    &lt;li id=&quot;liid&quot;&gt;1&lt;/li&gt;
  &lt;/ul&gt;
  &lt;script&gt;
    const body = document.querySelector(&#39;body&#39;)
    const ul = document.querySelector(&#39;ul&#39;)
    const li = document.getElementById(&#39;liid&#39;)
    // 先捕获，目标事件执行，然后冒泡
    body.addEventListener(&#39;click&#39;, () =&gt; console.log(&#39;body&#39;))
    ul.addEventListener(&#39;click&#39;, () =&gt; console.log(&#39;ul&#39;))
    li.addEventListener(&#39;click&#39;, () =&gt; console.log(&#39;li&#39;))
    // 点击 \`li\` 元素，将依次打印: \`li =&gt; ul =&gt; body\`

    // 如果是这样，事件将在捕获阶段执行
    body.addEventListener(&#39;click&#39;, () =&gt; console.log(&#39;body&#39;), true)
    ul.addEventListener(&#39;click&#39;, () =&gt; console.log(&#39;ul&#39;), true)
    li.addEventListener(&#39;click&#39;, () =&gt; console.log(&#39;li&#39;), true)
    // 点击 \`li\` 元素，将依次打印: \`body =&gt; ul =&gt; li\`
  &lt;/script&gt;
&lt;/body&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://mp-cb2e47ef-a802-469a-a81c-2b6efa9f8b60.cdn.bspapp.com/blog-resource/images/dom2-event.png" alt="img"></p><p>这种通过<code>addEventListener</code>定义事件监听就是 <code>DOM2</code> 级事件模型。</p>`,22),c=[t];function o(s,a){return d(),i("div",null,c)}const u=e(l,[["render",o],["__file","shijianmoxing.html.vue"]]);export{u as default};
