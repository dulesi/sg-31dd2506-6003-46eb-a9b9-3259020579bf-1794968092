import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "Do I have to cut out all fruit or natural foods?",
    a: "No. The program focuses on reducing added sugars, spotting hidden sugar sources, and building sustainable daily food choices rather than rigid deprivation.",
  },
  {
    q: "How much time does AdioSugar take each day?",
    a: "Just a few minutes a day to check your current day's guidance, log your progress, or use the craving tool when needed.",
  },
  {
    q: "Where can I use my AdioSugar account?",
    a: "You can access your account on the web and on supported mobile devices using your sign-in credentials.",
  },
  {
    q: "Is AdioSugar a medical service or medical device?",
    a: "No. AdioSugar provides educational wellness and habit-tracking tools only, and is not a substitute for professional medical advice, diagnosis, or treatment.",
  },
]

export function HomeFAQ() {
  return (
    <section id="faq" className="bg-card py-16 md:py-24 border-y border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              value={`item-${i}`}
              className="bg-background rounded-2xl border border-border px-6 shadow-md"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}