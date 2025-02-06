'use client'

import { useRouter } from "next/navigation"
import Image from "next/image"

import Button from "@/components/button"
import Card from "@/components/card"
import Header from "@/components/header"
import Monitor from "@/components/monitor"
import { theme } from "@/theme"

const App = () => {
  const router = useRouter()

  const onGetStarted = () => {
    router.push('/home')
  }

  return (
    <div className={`${(theme === 'light') ? 'light-bg' : 'dark-bg'} h-screen`}>
      <Header text="i love you" isBorderBottom={false} theme={theme} />
      <div className={`${(theme === 'light')
        ? 'light-border light-container-bg '
        : 'dark-border dark-container-bg'
        }
            p-6 flex justify-center items-center rounded-b-[2rem] shadow-lg 
            `}>

        <Monitor theme={theme}>
          <h1 className={`${(theme === 'light')
            ? 'light-text'
            : 'dark-text'
            }
            text-[3.4rem] -my-4
            `}>
            Happy Valentine&#39;s Day Dianaaa
          </h1>
        </Monitor>

      </div>

      <div className="px-[1.7rem] py-[3rem]">

        <Card theme={theme}>
          <div className="flex gap-6 flex-col items-center">
            <Monitor theme={theme}>
              <Image src='/landing-kitty.png' width={400} height={347} alt='...' className="scale-110" />
            </Monitor>

            <Button mode="secondary" theme={theme} onClick={onGetStarted}>get started</Button>

          </div>
        </Card>

      </div>

    </div>
  )
}

export default App