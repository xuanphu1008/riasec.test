import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Sparkles, Brain, Target, TrendingUp, Award, ArrowRight, CheckCircle, BookOpen, Loader2 } from 'lucide-react';

const RIASECCareerTest = () => {
  const [page, setPage] = useState('intro');
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [careerGoals, setCareerGoals] = useState({
    name: '',
    class: '',
    career: '',
    skills: '',
    oneYearPlan: '',
    parentEmail: ''
  });

  // 🔥 QUAN TRỌNG: Thay YOUR_SHEETDB_API_URL bằng API URL của bạn
  const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/l3w3hhxab5liu'; // Ví dụ: https://sheetdb.io/api/v1/xxxxx

  const questions = [
    { id: 1, text: "Tôi thích làm việc với máy móc, dụng cụ, sửa chữa đồ vật.", category: "R" },
    { id: 2, text: "Tôi thích tìm hiểu nguyên nhân của hiện tượng tự nhiên (ví dụ: tại sao mây mưa).", category: "R" },
    { id: 3, text: "Tôi thích vẽ, làm đồ thủ công, thiết kế sáng tạo.", category: "R" },
    { id: 4, text: "Tôi thích hướng dẫn và giúp đỡ bạn bè khi họ học.", category: "R" },
    { id: 5, text: "Tôi thích thuyết trình, thuyết phục hoặc tổ chức sự kiện nhỏ.", category: "R" },
    { id: 6, text: "Tôi thích làm việc theo quy tắc, sắp xếp giấy tờ hoặc lập danh sách.", category: "I" },
    { id: 7, text: "Tôi vui khi tham gia lắp ráp đồ chơi, mô hình, hoặc sửa đồ trong nhà.", category: "I" },
    { id: 8, text: "Tôi thích đọc sách khoa học, làm thí nghiệm nhỏ để khám phá.", category: "I" },
    { id: 9, text: "Tôi cảm thấy vui khi tạo ra một bức tranh, bài hát hoặc câu chuyện.", category: "I" },
    { id: 10, text: "Tôi thích làm việc nhóm để chăm sóc, hỗ trợ người khác.", category: "I" },
    { id: 11, text: "Tôi muốn quản lý một dự án nhỏ hoặc bán hàng khi có dịp.", category: "A" },
    { id: 12, text: "Tôi cảm thấy an tâm khi công việc rõ ràng, có quy trình.", category: "A" },
    { id: 13, text: "Tôi thích các hoạt động ngoài trời, thể thao, kỹ thuật thực hành.", category: "A" },
    { id: 14, text: "Tôi thích suy nghĩ, phân tích, tìm lời giải cho vấn đề.", category: "A" },
    { id: 15, text: "Tôi muốn làm những việc liên quan đến nghệ thuật, sân khấu hoặc sáng tạo hình ảnh.", category: "A" },
    { id: 16, text: "Tôi sẵn sàng lắng nghe và tư vấn khi người khác gặp khó khăn.", category: "S" },
    { id: 17, text: "Tôi hay có ý tưởng bắt đầu một hoạt động hoặc dự án nhỏ.", category: "S" },
    { id: 18, text: "Tôi thích làm công việc cần độ chính xác và theo hướng dẫn chi tiết.", category: "S" },
    { id: 19, text: "Tôi hứng thú với nghề nghiệp cần kỹ năng thực hành (thợ, kỹ sư cơ bản).", category: "S" },
    { id: 20, text: "Tôi thích nghiên cứu, đặt câu hỏi 'tại sao' và tìm bằng chứng.", category: "S" },
    { id: 21, text: "Tôi thấy thích thú khi thiết kế trang trí, phối màu, hoặc sáng tạo hình ảnh.", category: "E" },
    { id: 22, text: "Tôi thích tham gia hoạt động cộng đồng, giúp trẻ nhỏ hoặc người già.", category: "E" },
    { id: 23, text: "Tôi tự tin khi phải thuyết phục mọi người làm theo ý mình.", category: "E" },
    { id: 24, text: "Tôi thích công việc hành chính, sổ sách, lưu trữ tài liệu.", category: "E" },
    { id: 25, text: "Tôi thấy thích khám phá công cụ kỹ thuật mới (điện, máy, robot cơ bản).", category: "E" },
    { id: 26, text: "Tôi tò mò về cách mọi thứ hoạt động và muốn tìm hiểu sâu hơn.", category: "C" },
    { id: 27, text: "Tôi muốn thử làm sản phẩm thủ công để trưng bày.", category: "C" },
    { id: 28, text: "Tôi thích trao đổi, lắng nghe và giải bài toán cuộc sống của người khác.", category: "C" },
    { id: 29, text: "Tôi có mong muốn thử lập một gian hàng hoặc bán sản phẩm nhỏ.", category: "C" },
    { id: 30, text: "Tôi thích làm việc có trình tự, thực hiện theo danh sách công việc.", category: "C" }
  ];

  const categoryInfo = {
    R: {
      name: "Realistic - Thực tế",
      shortName: "Thực tế",
      color: "#3B82F6",
      icon: "🔧",
      description: "Bạn có khả năng làm việc với tay, thích hoạt động thực hành và kỹ thuật. Bạn phù hợp với các nghề như: Kỹ sư cơ khí, Thợ điện, Kiến trúc sư, Nông nghiệp, Thợ sửa chữa.",
      careers: "Kỹ sư, Thợ kỹ thuật, Kiến trúc sư"
    },
    I: {
      name: "Investigative - Nghiên cứu",
      shortName: "Nghiên cứu",
      color: "#8B5CF6",
      icon: "🔬",
      description: "Bạn thích suy nghĩ, phân tích và tìm hiểu. Bạn phù hợp với các nghề như: Nhà khoa học, Bác sĩ, Lập trình viên, Nhà nghiên cứu, Kỹ sư phần mềm.",
      careers: "Nhà khoa học, Bác sĩ, Lập trình viên"
    },
    A: {
      name: "Artistic - Nghệ thuật",
      shortName: "Nghệ thuật",
      color: "#EC4899",
      icon: "🎨",
      description: "Bạn có năng khiếu sáng tạo, thích nghệ thuật và thiết kế. Bạn phù hợp với các nghề như: Họa sĩ, Nhà thiết kế, Nhạc sĩ, Diễn viên, Kiến trúc sư nội thất.",
      careers: "Họa sĩ, Nhà thiết kế, Kiến trúc sư nội thất"
    },
    S: {
      name: "Social - Xã hội",
      shortName: "Xã hội",
      color: "#10B981",
      icon: "👥",
      description: "Bạn thích làm việc với người khác, giúp đỡ và hỗ trợ. Bạn phù hợp với các nghề như: Giáo viên, Y tá, Tư vấn viên, Nhân viên xã hội, Chăm sóc khách hàng.",
      careers: "Giáo viên, Y tá, Tư vấn viên"
    },
    E: {
      name: "Enterprising - Quản lý",
      shortName: "Quản lý",
      color: "#F59E0B",
      icon: "💼",
      description: "Bạn có khả năng lãnh đạo, thuyết phục và kinh doanh. Bạn phù hợp với các nghề như: Quản lý, Doanh nhân, Nhân viên bán hàng, Marketing, Chính trị gia.",
      careers: "Quản lý, Doanh nhân, Marketing"
    },
    C: {
      name: "Conventional - Quy tắc",
      shortName: "Quy tắc",
      color: "#6366F1",
      icon: "📋",
      description: "Bạn thích làm việc có tổ chức, theo quy trình rõ ràng. Bạn phù hợp với các nghề như: Kế toán, Thư ký, Quản trị văn phòng, Thủ quỹ, Nhân viên hành chính.",
      careers: "Kế toán, Thư ký, Quản trị văn phòng"
    }
  };

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateResults = async () => {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    
    questions.forEach(q => {
      if (answers[q.id] === true) {
        scores[q.category]++;
      }
    });

    const chartData = Object.entries(scores).map(([key, value]) => ({
      category: categoryInfo[key].shortName,
      fullName: categoryInfo[key].name,
      score: value,
      percentage: (value / 5) * 100,
      fill: categoryInfo[key].color
    }));

    const radarData = Object.entries(scores).map(([key, value]) => ({
      category: categoryInfo[key].shortName,
      value: value,
      fullMark: 5
    }));

    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topCategory = sortedScores[0][0];

    const resultData = {
      scores,
      chartData,
      radarData,
      topCategory,
      topScore: sortedScores[0][1],
      sortedScores
    };

    setResults(resultData);
    setPage('results');
  };

  const saveToGoogleSheets = async (data, sheetName) => {
    if (SHEETDB_API_URL === 'YOUR_SHEETDB_API_URL') {
      console.warn('⚠️ Chưa cấu hình SheetDB API URL!');
      return false;
    }

    try {
      setLoading(true);
      const response = await fetch(`${SHEETDB_API_URL}?sheet=${sheetName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: [data] })
      });

      if (!response.ok) throw new Error('Failed to save data');
      return true;
    } catch (error) {
      console.error('Error saving to Google Sheets:', error);
      alert('Có lỗi xảy ra khi lưu dữ liệu. Vui lòng thử lại!');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const isAllAnswered = () => {
    return questions.every(q => answers[q.id] !== undefined);
  };

  const handleGoalSubmit = async () => {
    const timestamp = new Date().toLocaleString('vi-VN');
    
    // Lưu kết quả test
    const testData = {
      Timestamp: timestamp,
      Name: careerGoals.name,
      Class: careerGoals.class,
      R: results.scores.R,
      I: results.scores.I,
      A: results.scores.A,
      S: results.scores.S,
      E: results.scores.E,
      C: results.scores.C,
      TopCategory: categoryInfo[results.topCategory].name
    };

    // Lưu mục tiêu
    const goalsData = {
      Timestamp: timestamp,
      Name: careerGoals.name,
      Class: careerGoals.class,
      Career: careerGoals.career,
      Skills: careerGoals.skills,
      OneYearPlan: careerGoals.oneYearPlan,
      ParentEmail: careerGoals.parentEmail || 'Không có'
    };

    const testSaved = await saveToGoogleSheets(testData, 'Test Results');
    const goalsSaved = await saveToGoogleSheets(goalsData, 'Career Goals');

    if (testSaved && goalsSaved) {
      alert('✅ Mục tiêu nghề nghiệp của bạn đã được lưu thành công! Cảm ơn bạn đã hoàn thành.');
      // Reset form
      setPage('intro');
      setAnswers({});
      setResults(null);
      setCareerGoals({
        name: '',
        class: '',
        career: '',
        skills: '',
        oneYearPlan: '',
        parentEmail: ''
      });
    }
  };

  if (page === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-4xl w-full">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center justify-center gap-2 mb-6">
                <Sparkles className="w-10 h-10 text-yellow-400 animate-pulse" />
                <Brain className="w-12 h-12 text-purple-400" />
                <Sparkles className="w-10 h-10 text-yellow-400 animate-pulse" />
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-4 tracking-tight">
                RIASEC
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Trắc nghiệm Hướng nghiệp
              </h2>
              <p className="text-xl text-purple-200 font-medium">
                Khám phá con đường sự nghiệp của bạn
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <Target className="w-6 h-6 text-pink-400" />
                      Điểm nổi bật
                    </h3>
                    <div className="space-y-3">
                      {[
                        { icon: "📝", text: "30 câu hỏi chính xác" },
                        { icon: "🎯", text: "6 nhóm tính cách RIASEC" },
                        { icon: "📊", text: "Phân tích chi tiết kết quả" },
                        { icon: "💡", text: "Gợi ý nghề nghiệp phù hợp" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
                          <span className="text-2xl">{item.icon}</span>
                          <span className="text-white font-medium">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30">
                    <h3 className="text-xl font-bold text-white mb-4">Về bài test</h3>
                    <p className="text-purple-100 leading-relaxed mb-4">
                      Dựa trên mô hình Holland RIASEC - công cụ đánh giá nghề nghiệp được tin dùng toàn cầu, giúp bạn hiểu rõ điểm mạnh và định hướng phù hợp.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(categoryInfo).map(([key, info]) => (
                        <div key={key} className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm text-white border border-white/20">
                          {info.icon} {info.shortName}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setPage('test')}
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white font-bold py-5 px-8 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3 group"
                >
                  <span>Bắt đầu khám phá</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (page === 'test') {
    const progress = (Object.keys(answers).length / questions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-4xl mx-auto p-4 py-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 mb-6 sticky top-4 z-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-7 h-7 text-purple-400" />
                Bài trắc nghiệm
              </h2>
              <div className="text-right">
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {Object.keys(answers).length}/{questions.length}
                </div>
                <div className="text-sm text-purple-200">câu hỏi</div>
              </div>
            </div>
            <div className="relative w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-center text-purple-200 text-sm mt-2">
              {progress.toFixed(0)}% hoàn thành
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((q) => {
              const isAnswered = answers[q.id] !== undefined;
              return (
                <div 
                  key={q.id} 
                  className={`bg-white/10 backdrop-blur-xl rounded-2xl border transition-all duration-300 ${
                    isAnswered ? 'border-green-400/50 shadow-lg shadow-green-500/20' : 'border-white/20'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                        isAnswered 
                          ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white' 
                          : 'bg-white/10 text-purple-300'
                      }`}>
                        {isAnswered ? <CheckCircle className="w-6 h-6" /> : q.id}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium leading-relaxed mb-4">
                          {q.text}
                        </p>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleAnswer(q.id, true)}
                            className={`flex-1 py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 ${
                              answers[q.id] === true
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/50 scale-105'
                                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                            }`}
                          >
                            ✓ Đúng
                          </button>
                          <button
                            onClick={() => handleAnswer(q.id, false)}
                            className={`flex-1 py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 ${
                              answers[q.id] === false
                                ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/50 scale-105'
                                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                            }`}
                          >
                            ✗ Không
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sticky bottom-4 mt-8">
            <button
              onClick={calculateResults}
              disabled={!isAllAnswered()}
              className={`w-full py-5 px-8 rounded-2xl text-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 ${
                isAllAnswered()
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white shadow-2xl transform hover:scale-105 cursor-pointer'
                  : 'bg-white/10 text-gray-400 cursor-not-allowed border border-white/20'
              }`}
            >
              {isAllAnswered() ? (
                <>
                  <Award className="w-6 h-6" />
                  <span>Xem kết quả</span>
                  <ArrowRight className="w-6 h-6" />
                </>
              ) : (
                <span>Vui lòng trả lời tất cả các câu hỏi</span>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (page === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center gap-2 mb-4">
              <Award className="w-12 h-12 text-yellow-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-2">
              Kết quả của bạn
            </h2>
            <p className="text-purple-200 text-lg">Phân tích tính cách và gợi ý nghề nghiệp</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 backdrop-blur-xl rounded-3xl border border-purple-400/30 p-8 mb-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{categoryInfo[results.topCategory].icon}</div>
              <h3 className="text-3xl font-black text-white mb-2">
                {categoryInfo[results.topCategory].name}
              </h3>
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 border border-white/30">
                <span className="text-2xl font-bold text-white">{results.topScore}/5 điểm</span>
              </div>
            </div>
            <p className="text-white text-lg leading-relaxed text-center mb-6">
              {categoryInfo[results.topCategory].description}
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-purple-200 font-semibold mb-3 text-center">Nghề nghiệp phù hợp:</p>
              <p className="text-white text-xl font-bold text-center">{categoryInfo[results.topCategory].careers}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-purple-400" />
                Biểu đồ điểm số
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={results.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="category" stroke="rgba(255,255,255,0.7)" />
                  <YAxis domain={[0, 5]} stroke="rgba(255,255,255,0.7)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '12px',
                      color: 'white'
                    }} 
                  />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                    {results.chartData.map((entry, index) => (
                      <Bar key={index} dataKey="score" fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Brain className="w-6 h-6 text-pink-400" />
                Biểu đồ Radar
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={results.radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.2)" />
                  <PolarAngleAxis dataKey="category" stroke="rgba(255,255,255,0.7)" />
                  <PolarRadiusAxis domain={[0, 5]} stroke="rgba(255,255,255,0.7)" />
                  <Radar name="Điểm số" dataKey="value" stroke="#EC4899" fill="#EC4899" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Chi tiết các nhóm tính cách</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {results.sortedScores.map(([key, score], idx) => (
                <div 
                  key={key}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">{categoryInfo[key].icon}</div>
                    <div className="flex-1">
                      <div className="text-white font-bold">{categoryInfo[key].shortName}</div>
                      <div className="text-purple-200 text-sm">{score}/5 điểm</div>
                    </div>
                    {idx === 0 && (
                      <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-lg text-xs font-bold">
                        #1
                      </div>
                    )}
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(score / 5) * 100}%`,
                        backgroundColor: categoryInfo[key].color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-3xl border border-yellow-400/30 p-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💡</div>
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-white mb-3">
                  Lời khuyên từ chuyên gia
                </h4>
                <p className="text-white leading-relaxed text-lg">
                  Dựa trên kết quả trắc nghiệm, bạn có xu hướng mạnh về nhóm <strong className="text-yellow-300">{categoryInfo[results.topCategory].name}</strong>. 
                  Đây là điểm khởi đầu tuyệt vời để bạn khám phá các nghề nghiệp phù hợp. Hãy tìm hiểu thêm về các nghề nghiệp thuộc nhóm này, 
                  rèn luyện các kỹ năng cần thiết từ bây giờ. Đừng quên tham khảo ý kiến của giáo viên và phụ huynh để có định hướng tốt nhất!
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setPage('goals')}
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white font-bold py-5 px-8 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3"
          >
            <Target className="w-6 h-6" />
            <span>Lập mục tiêu nghề nghiệp</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  if (page === 'goals') {
    const isFormValid = careerGoals.name && careerGoals.class && careerGoals.career && 
                        careerGoals.skills && careerGoals.oneYearPlan;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center gap-2 mb-4">
              <Target className="w-12 h-12 text-green-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 mb-2">
              Mục tiêu của tôi
            </h2>
            <p className="text-purple-200 text-lg">Lập kế hoạch nghề nghiệp cho tương lai</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-6">
            <div className="space-y-6">
              <div>
                <label className="block text-white font-bold mb-3 flex items-center gap-2">
                  <span>👤</span> Họ và tên học sinh <span className="text-pink-400">*</span>
                </label>
                <input
                  type="text"
                  value={careerGoals.name}
                  onChange={(e) => setCareerGoals({...careerGoals, name: e.target.value})}
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-purple-300 backdrop-blur-sm transition-all"
                  placeholder="Nhập họ tên của bạn"
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-3 flex items-center gap-2">
                  <span>🏫</span> Lớp <span className="text-pink-400">*</span>
                </label>
                <input
                  type="text"
                  value={careerGoals.class}
                  onChange={(e) => setCareerGoals({...careerGoals, class: e.target.value})}
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-purple-300 backdrop-blur-sm transition-all"
                  placeholder="Ví dụ: 9A1"
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-3 flex items-center gap-2">
                  <span>💼</span> Nghề/nhóm nghề bạn thích <span className="text-pink-400">*</span>
                </label>
                <input
                  type="text"
                  value={careerGoals.career}
                  onChange={(e) => setCareerGoals({...careerGoals, career: e.target.value})}
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-purple-300 backdrop-blur-sm transition-all"
                  placeholder="Ví dụ: Giáo viên, Kỹ thuật viên, Thiết kế..."
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-3 flex items-center gap-2">
                  <span>🎯</span> Bạn cần rèn kỹ năng gì ngay từ bây giờ? <span className="text-pink-400">*</span>
                </label>
                <input
                  type="text"
                  value={careerGoals.skills}
                  onChange={(e) => setCareerGoals({...careerGoals, skills: e.target.value})}
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-purple-300 backdrop-blur-sm transition-all"
                  placeholder="Ví dụ: Tiếng Anh, Toán, Vẽ, Làm thí nghiệm..."
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-3 flex items-center gap-2">
                  <span>📅</span> Bạn sẽ làm gì trong 1 năm tới để tiến gần mục tiêu? <span className="text-pink-400">*</span>
                </label>
                <textarea
                  value={careerGoals.oneYearPlan}
                  onChange={(e) => setCareerGoals({...careerGoals, oneYearPlan: e.target.value})}
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-purple-300 backdrop-blur-sm transition-all resize-none"
                  rows="5"
                  placeholder="Mô tả kế hoạch cụ thể của bạn..."
                ></textarea>
              </div>

              <div>
                <label className="block text-white font-bold mb-3 flex items-center gap-2">
                  <span>📧</span> Email liên hệ của phụ huynh
                </label>
                <input
                  type="email"
                  value={careerGoals.parentEmail}
                  onChange={(e) => setCareerGoals({...careerGoals, parentEmail: e.target.value})}
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-purple-300 backdrop-blur-sm transition-all"
                  placeholder="email@example.com (không bắt buộc)"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleGoalSubmit}
            disabled={!isFormValid || loading}
            className={`w-full py-5 px-8 rounded-2xl text-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 ${
              isFormValid && !loading
                ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white shadow-2xl transform hover:scale-105 cursor-pointer'
                : 'bg-white/10 text-gray-400 cursor-not-allowed border border-white/20'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Đang lưu dữ liệu...</span>
              </>
            ) : isFormValid ? (
              <>
                <CheckCircle className="w-6 h-6" />
                <span>Hoàn thành và gửi</span>
              </>
            ) : (
              <span>Vui lòng điền đầy đủ thông tin bắt buộc</span>
            )}
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default RIASECCareerTest;