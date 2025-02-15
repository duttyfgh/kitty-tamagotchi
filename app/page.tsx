'use client'

import { useRouter } from "next/navigation"
import Image from "next/image"

import { theme } from "@/theme"
import { createKittySession, getCurrentSession } from "@/data"

import Button from "@/components/button"
import Card from "@/components/card"
import Header from "@/components/header"
import Monitor from "@/components/monitor"

const App = () => {

  const router = useRouter()

  const onGetStarted = () => {
    const currentSession = getCurrentSession()

    if (!currentSession) {
      createKittySession()
    } 

    router.push('/home')
  }

  return (
    <div className={`${(theme === 'light') ? 'light-bg' : 'dark-bg'} flex flex-col items-center h-screen`}>
      <div>
        <Header text="i love you" isBorderBottom={false} theme={theme} />
        <div className={`${(theme === 'light')
          ? 'light-border light-container-bg '
          : 'dark-border dark-container-bg'
          }
                p-[15px] flex justify-center items-center rounded-b-[20px] shadow-md w-[414px]
                `}>
  
          <Monitor theme={theme}>
            <h1 className={`${(theme === 'light')
              ? 'light-text'
              : 'dark-text'
              }
                text-[23px] -my-[15px]
                `}>
              Happy Valentine&#39;s Day Dianaaa {`<3`}
            </h1>
          </Monitor>
        </div>
      </div>

      <div className="p-[40px]">

        <Card theme={theme}>
          <div className="flex gap-[15px] flex-col items-center">
            <Monitor theme={theme}>
              <Image src='/landing-kitty.png' width={248} height={347} alt='...' />
            </Monitor>

            <Button mode="secondary" theme={theme} onClick={onGetStarted}>get started</Button>

          </div>
        </Card>

      </div>

    </div>
  )
}

export default App