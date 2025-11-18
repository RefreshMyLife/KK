export default function SubmitArtworkInfo() {
  return (
    <div className="flex flex-col gap-8 xl:w-[293px] w-[100%]">
      <div className="flex flex-col gap-6 xl:w-[293px]">
        <h3 className="font-gibb text-2xl leading-[1.1em] uppercase">
          Предложить товар
        </h3>
        <div className="flex flex-col gap-3">
          <p className="text-base leading-[1.1em]">
            Вы можете предложить разместить ваш товар в нашем каталоге
          </p>
          <p className="text-base leading-[1.1em]">
            После отправления заявки ваш товар появится в разделе «Мои картины»
            — там можно проследить его статус.
          </p>
        </div>
      </div>
    </div>
  );
}
