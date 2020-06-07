const Buffer2Map = require("./buffer2map")

describe("buffer2map.js", () => {

  describe("dataview2map", () => {

    test("kv33", () => {
      const ab = new ArrayBuffer(6)
      const dv = Buffer2Map.a2d(ab)

      dv.setUint8(0, 0x01)
      dv.setUint8(1, 0x42)

      dv.setUint8(2, 0x01)
      dv.setUint8(3, 0xff)

      dv.setUint8(4, 0x03)
      dv.setUint8(5, 0x10)

      const keyf = (d, b) => d.getUint8(b)
      const valf = (d, b) => d.getUint8(b+1)
      const rowpower = 1

      const m = Buffer2Map.dataview2map(dv, keyf, valf, rowpower)

      const v1 = m.get(1)
      const v3 = m.get(3)

      expect(v1.length).toBe(2)
      expect(v1[0]).toBe(0x42)
      expect(v1[1]).toBe(255)

      expect(v3.length).toBe(1)
      expect(v3[0]).toBe(16)
    })

    test("kv55", () => {
      const ab = new ArrayBuffer(8*4)
      const dv = Buffer2Map.a2d(ab)

      const k1 = "munt"
      const k2 = "towr"

      const v11 = 0x3776
      const v12 = 0x0599

      const v21 = 0x0634
      const v22 = 0x0333

      dv.setUint8( 0*8+0, k1.charCodeAt(0))
      dv.setUint8( 0*8+1, k1.charCodeAt(1))
      dv.setUint8( 0*8+2, k1.charCodeAt(2))
      dv.setUint8( 0*8+3, k1.charCodeAt(3))
      dv.setUint32(0*8+4, v11, true)

      dv.setUint8( 1*8+0, k1.charCodeAt(0))
      dv.setUint8( 1*8+1, k1.charCodeAt(1))
      dv.setUint8( 1*8+2, k1.charCodeAt(2))
      dv.setUint8( 1*8+3, k1.charCodeAt(3))
      dv.setUint32(1*8+4, v12, true)

      dv.setUint8( 2*8+0, k2.charCodeAt(0))
      dv.setUint8( 2*8+1, k2.charCodeAt(1))
      dv.setUint8( 2*8+2, k2.charCodeAt(2))
      dv.setUint8( 2*8+3, k2.charCodeAt(3))
      dv.setUint32(2*8+4, v21, true)

      dv.setUint8( 3*8+0, k2.charCodeAt(0))
      dv.setUint8( 3*8+1, k2.charCodeAt(1))
      dv.setUint8( 3*8+2, k2.charCodeAt(2))
      dv.setUint8( 3*8+3, k2.charCodeAt(3))
      dv.setUint32(3*8+4, v22, true)

      const keyf = (d, b) => {
	const c0 = d.getUint8(b+0)
	const c1 = d.getUint8(b+1)
	const c2 = d.getUint8(b+2)
	const c3 = d.getUint8(b+3)
	return [c0,c1,c2,c3]
	  .map(c => String.fromCharCode(c))
	  .join("")
      }
      const valf = (d, b) => d.getUint32(b+4, true)
      const rowpower = 3

      const m = Buffer2Map.dataview2map(dv, keyf, valf, rowpower)

      expect(m.has("munt")).toBe(true)
      expect(m.has("towr")).toBe(true)

      const lm = m.get("munt")
      const lt = m.get("towr")

      expect(lm.length).toBe(2)
      expect(lt.length).toBe(2)

      expect(lm[0]).toBe(0x3776)
      expect(lm[1]).toBe(0x0599)

      expect(lt[0]).toBe(0x0634)
      expect(lt[1]).toBe(0x0333)
    })

  })

})
