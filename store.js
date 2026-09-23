const DB={cart:"eh_cart",user:"eh_user",users:"eh_users",orders:"eh_orders"};
const get=(k,f)=>JSON.parse(localStorage.getItem(k)||JSON.stringify(f));
const put=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
function cart(){return get(DB.cart,[])}
function addCart(id,qty=1){let c=cart(),x=c.find(i=>i.id==id);x?x.qty+=qty:c.push({id,qty});put(DB.cart,c)}
function removeCart(id){put(DB.cart,cart().filter(x=>x.id!=id))}
function setQty(id,qty){let c=cart(),x=c.find(i=>i.id==id);if(x)x.qty=Math.max(1,qty);put(DB.cart,c)}
function clearCart(){put(DB.cart,[])}
function currentUser(){return get(DB.user,null)}
function logout(){localStorage.removeItem(DB.user);location.href="index.html"}
function money(n){return "$"+Number(n).toFixed(2)}
function product(id){return PRODUCTS.find(p=>p.id==id)}
function cartItems(){return cart().map(x=>({...product(x.id),qty:x.qty})).filter(Boolean)}
function total(){return cartItems().reduce((a,x)=>a+(x.s??x.p)*x.qty,0)}
function count(){return cart().reduce((a,x)=>a+x.qty,0)}
