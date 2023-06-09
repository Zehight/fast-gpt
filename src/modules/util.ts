export const phoneValidate = (phone: string) => /^[1][3-9][0-9]{9}$/.test(phone)

export function renderFileSize(value: string) {
  if (!value) return '0 Bytes'
  const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let index = 0
  const srcsize = parseFloat(value)
  index = Math.floor(Math.log(srcsize) / Math.log(1024))
  let size = srcsize / Math.pow(1024, index)
  size = Number(size.toFixed(2)) //保留的小数位数
  return size + unitArr[index]
}

/**
 * 加载js
 */
export const loadJs = (url: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.onload = () => resolve(true)
    script.onerror = () => reject(false)
    script.src = url
    document.head.appendChild(script)
  })
}

export const randomNumber = (start: number, end: number) => {
  if (end < start) {
    return false
  }
  return Math.round(Math.random() * (end - start) + start)
}
