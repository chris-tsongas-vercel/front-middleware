import Image from 'next/image'

export default function Page() {
  return (
    <div>
      <h1>Test</h1>
      <Image
        src="/images/googlelogo_color_272x92dp.png"
        alt="Google logo"
        width={544}
        height={184}
      />
    </div>
  )
}
