/**生成字母数组**/
export function getAllLetter () {
  var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
  return letterStr.split(",");
}

/**生成一个随机数**/
export function randomNum (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**生成一个随机色**/
export function randomColor (min, max) {
  var r = randomNum(min, max);
  var g = randomNum(min, max);
  var b = randomNum(min, max);
  return "rgb(" + r + "," + g + "," + b + ")";
}