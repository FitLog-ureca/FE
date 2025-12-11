const FillLevel = ({ className }: { className?: string }) => {
  return (
    <section className={className}>
      <div className="bg-card border border-border rounded-2xl p-4 shadow">
        <h3 className="text-lg font-semibold mb-3">활동 수준</h3>
        
        <div className="flex items-center gap-3 flex-wrap text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded-md"></div>
            <span className="text-muted-foreground">없음</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-fitlog-200 rounded-md"></div>
            <span className="text-muted-foreground">가벼움</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-fitlog-400 rounded-md"></div>
            <span className="text-muted-foreground">보통</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-fitlog-500 rounded-md"></div>
            <span className="text-muted-foreground">강함</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FillLevel;
