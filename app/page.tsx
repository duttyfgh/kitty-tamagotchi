import Button from "@/components/button"
import Card from "@/components/card"
import Header from "@/components/header"
import Monitor from "@/components/monitor"
import Image from "next/image"

const App = () => {
  const theme = "light"

  return (
    <div className="light-bg h-screen bg-red-400">
      <Header text="i love you" isBorderBottom={false} />
      <div className={`${(theme === 'light')
        ? 'light-border light-container-bg '
        : 'dark-border dark-container-bg'
        }
            p-6 flex justify-center items-center rounded-b-[2rem] shadow-lg
            `}>

        <Monitor>
          <h1 className="text-[3.4rem] -my-4">
            Happy Valentine&#39;s Day Dianaaa
          </h1>
        </Monitor>

      </div>

      <div className="px-[1.7rem] pt-[6rem]">

        <Card>
          <div className="flex gap-6 flex-col items-center">
            <Monitor>
              <Image src='/landing-kitty.png' width={400} height={347} alt='...' className="scale-110"/>
            </Monitor>

            <Button mode="secondary" theme="light">
              <span>get started</span>
            </Button>

          </div>
        </Card>

      </div>

    </div>
  )
}

export default App