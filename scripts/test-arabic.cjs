const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch();const page=await browser.newPage();const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8766/ar.html');
 assert.equal(await page.locator('html').getAttribute('dir'),'rtl');
 assert.equal(await page.locator('.language-switch [aria-current=page]').getAttribute('href'),'ar.html');
 assert.equal(await page.locator('.hero-brand').count(),0);
 for(const width of [320,390,768,1024,1440]){
  await page.setViewportSize({width,height:1000});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow at '+width);
  const heading=await page.locator('h1').boundingBox();const highlights=await page.locator('.hero-highlights').boundingBox();assert(heading.y+heading.height<highlights.y,'hero overlap '+width);
  if(width===390||width===1440)await page.screenshot({path:'/tmp/mice-ar-'+width+'.png'});
 }
 await page.locator('#game-more').click();assert.equal(await page.locator('.game-tile:visible').count(),6);assert((await page.locator('#game-more').textContent()).includes('أقل'));
 await page.locator('[data-game-preview=darts]').click();assert((await page.locator('#game-preview-title').textContent()).includes('السهام'));await page.keyboard.press('Escape');
 await page.locator('[data-scene=corporate]').click();assert((await page.locator('#scene-title').textContent()).includes('مشترك'));
 await page.locator('[data-destination=buy]').click();assert((await page.locator('#destination-panel').textContent()).includes('التذاكر'));
 await page.locator('[data-demo-tab=quiz]').click();for(const i of [0,1,2]){await page.locator('.answer').nth(i).click();await page.locator('.demo-feedback button').click();}assert((await page.locator('#demo-panel').textContent()).includes('أكملت'));
 await page.locator('[data-demo-tab=vote]').click();await page.locator('.vote-option').first().click();assert((await page.locator('.demo-note').textContent()).includes('أُضيف'));
 await page.locator('[data-demo-tab=wall]').click();await page.locator('.wall-form input').fill('فعالية رائعة');await page.locator('.wall-form button').click();assert((await page.locator('.word-wall').textContent()).includes('فعالية رائعة'));
 await page.locator('[data-journey="0"]').first().click();assert((await page.locator('#journey-title').textContent()).includes('مفاجأة'));await page.locator('#journey-next').click();assert((await page.locator('#journey-title').textContent()).includes('تجربة'));await page.keyboard.press('Escape');
 await page.locator('[name=identity]').selectOption('agency');await page.locator('#proposal-next').click();
 for(const [key,val] of Object.entries({event:'expo',goal:'engagement',budget:'unknown'}))await page.locator('[name='+key+']').selectOption(val);
 for(const [key,val] of Object.entries({date:'2027-02',venue:'دبي',people:'100'}))await page.locator('[name='+key+']').fill(val);
 await page.locator('#proposal-next').click();
 for(const [key,val] of Object.entries({company:'اختبار',name:'فريق الاختبار',email:'test@example.com'}))await page.locator('[name='+key+']').fill(val);
 await page.locator('[name=consent]').check();await page.locator('#proposal-next').click();
 const mail=decodeURIComponent(await page.locator('#proposal-mail').getAttribute('href'));assert(mail.includes('Language: ar'));assert(mail.includes('طلب مقترح'));
 assert(!(await page.locator('#proposal-result').innerText()).match(/[\u3400-\u9fff]/));
 const english=await page.evaluate(()=>[...document.querySelectorAll('main *')].filter(e=>!e.children.length&&e.getClientRects().length&&/[A-Za-z]{4}/.test(e.textContent)&&!/[\u0600-\u06ff]/.test(e.textContent)).map(e=>e.textContent.trim()));console.log('Latin-only visible text:',english);
 for(const lang of ['index.html','en.html']){await page.goto('http://127.0.0.1:8766/'+lang);assert.equal(await page.locator('.language-switch a').count(),3);assert.equal(await page.locator('.hero-brand').count(),0);}
 assert.deepEqual(errors,[]);await browser.close();console.log('PASS Arabic RTL, five widths, navigation, gallery, scenes, quiz, vote, wall, journey and Arabic email request; Chinese and English language links.');
})().catch(e=>{console.error(e);process.exit(1)});
