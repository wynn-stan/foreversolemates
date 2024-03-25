export default function AdditionalServices() {
  return (
    <div className="flex gap-6">
      <div>
        <video height={524} width={347} autoPlay muted>
          <source
            src={'/assets/images/homepage/services.mp4'}
            type="video/mp4"
          />
          Your browser does not support videos
        </video>
      </div>
      <div className="text-center text-lg">Additional Services</div>
    </div>
  );
}
