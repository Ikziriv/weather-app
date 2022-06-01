export function selectTextOnFocus(node: { select: () => any; addEventListener: (arg0: string, arg1: (event: any) => void) => void; removeEventListener: (arg0: string, arg1: (event: any) => void) => void }) {
    const handleFocus = (event: any) => {
      node && typeof node.select === 'function' && node.select()
    }
    node.addEventListener('focus', handleFocus)
    return {
        destroy() {
          node.removeEventListener('focus', handleFocus)
      }
    }
}