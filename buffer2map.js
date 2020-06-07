(function(g,f){

  const n = [ typeof module ]
    .filter(function(t){ return "object" === t })
    .map(function(_){ return typeof module.exports })
    .filter(function(t){ return "object" === t })
    .map(function(_){ return f(module.exports) })
  const b = [ typeof module ]
    .filter(function(t){ return "object" != t })
    .map(function(_){
      g.Buffer2Map = {}
      return f(g.Buffer2Map)
    })

  return n || b || null

})(this, function(e){

  e.a2d = function(buffer, byteOffset, byteLength){ return new DataView(
    buffer,
    byteOffset || 0,
    byteLength || buffer.byteLength
  ) }

  e.key5 = function(dv, byteOffset){ return dv.getUint32(
    byteOffset + 0 || 0,
    true
  ) }

  e.dataview2map = function(dv, keyf, valf, rowpower){
    const f = keyf || e.key5
    const g = valf || e.key5
    const p = rowpower ||  5
    const s = 1 << p              // rowsize = 2^5 = 32
    const I = dv.byteLength >>> p // size=256, rowsize=32 -> rowcnt = size >>> 5 = 2^3 = 8
    const m = new Map()
    for(let i=0; i<I; i++){
      const o = s*i
      const k = f(dv, o)
      const v = g(dv, o)
      const l = m.get(k) || []
      l.push(v)
      m.set(k, l)
    }
    return m
  }

  return null

})
