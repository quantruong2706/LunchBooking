import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface UseLoadGsiScriptOptions {
  scriptLoaded?: () => void
}

export function useLoadGsiScript(options: UseLoadGsiScriptOptions = {}): boolean {
  const { scriptLoaded } = options

  const [scriptLoadedSuccessfully, setScriptLoadedSuccessfully] = useState(false)

  const onScriptLoadSuccessRef = useRef(scriptLoaded)
  onScriptLoadSuccessRef.current = scriptLoaded

  const onScriptLoadErrorRef = useRef(scriptLoaded)
  onScriptLoadErrorRef.current = scriptLoaded

  useEffect(() => {
    const scriptTag = document.createElement('script')
    scriptTag.src = 'https://accounts.google.com/gsi/client'
    scriptTag.async = true
    scriptTag.defer = true
    scriptTag.onload = () => {
      setScriptLoadedSuccessfully(true)
      onScriptLoadSuccessRef.current?.()
    }
    scriptTag.onerror = () => {
      setScriptLoadedSuccessfully(false)
      onScriptLoadErrorRef.current?.()
    }

    document.body.appendChild(scriptTag)

    return () => {
      document.body.removeChild(scriptTag)
    }
  }, [])

  return scriptLoadedSuccessfully
}

type useGoogleLoginProps = Record<string, any> & {
  clientId: string
  scope?: string
  type?: 'code' | 'token'
}

export default function useGoogleLogin({ scope = '', type = 'code', onSuccess, onError, clientId, ...props }: useGoogleLoginProps): [(_: any) => any, boolean] {
  const [loading, setLoading] = useState(true)
  const scriptLoadedSuccessfully = useLoadGsiScript({
    scriptLoaded: () => setLoading(false),
  })
  const clientRef = useRef<any>()

  const onSuccessRef = useRef(onSuccess)
  onSuccessRef.current = onSuccess

  const onErrorRef = useRef(onError)
  onErrorRef.current = onError

  const reqType = useMemo(() => type === 'token', [type])

  useEffect(() => {
    if (!scriptLoadedSuccessfully) return

    clientRef.current = (window as any).google?.accounts.oauth2[reqType ? 'initTokenClient' : 'initCodeClient']({
      client_id: clientId,
      scope: `openid profile email ${scope}`,
      callback: (response: any) => {
        if (response.error) return onErrorRef.current?.(response)
        onSuccessRef.current?.(response as any)
      },
      ...props,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId, scriptLoadedSuccessfully, scope])

  const login = useCallback((overrideConfig: any) => {
    return clientRef.current.requestAccessToken(overrideConfig)
  }, [])

  const getCode = useCallback(() => {
    return clientRef.current.requestCode()
  }, [])

  return [reqType ? login : getCode, loading]
}
