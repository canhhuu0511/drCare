import React, { useEffect, useState } from "react";
import "../styles/clinicInfo.scss";
import { useNavigate, Link, useParams } from "react-router-dom";
import { manageService } from "../services/ManageService";
import MenuPopUp from "../components/card/menu_popup";
import { DoctorCardAppointment } from "../components/card/doctor_card_appointment";

export const ClinicPage = () => {
  const { id } = useParams();
  const [clinic, setClinic] = useState({
    name: "",
    address: "",
    image: "",
    markdown: null,
  });
  const [specialties, setSpecialties] = useState(null);
  const [specialtySelected, setSpecialtySelected] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const getClinic = async () => {
      await manageService
        .getClinicById(id)
        .then(async (result) => {
          setClinic(result.data);
          await manageService
            .getSpecialtyByClinicId(id)
            .then((e) => {
              setSpecialties(e.data.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    };
    getClinic();
  }, []);

  const onChosseSpecialty = () => {
    setShowMenu(true);
  };
  // console.log(specialtySelected);

  return (
    clinic && (
      <div className="clinic">
        <MenuPopUp
          setSpecialtySelected={setSpecialtySelected}
          arr={specialties}
          isShowMenu={showMenu}
          setShowMenu={setShowMenu}
        />
        <div className="clinic-top-content">
          <div className="container">
            <div className="clinic-image">
              <img
                src="https://cdn.bookingcare.vn/fr/w1000/2018/06/04/112823ptct.jpg"
                alt=""
              />
            </div>
            <div className="clinic-header">
              <div className="clinic-header-main">
                <img
                  src="https://cdn.bookingcare.vn/fr/w300/2018/06/18/083122lo-go-viet-duc.jpg"
                  alt=""
                  className="clinic-avatar"
                />
                <div className="clinic-info">
                  <h1 className="clinic-name">{clinic.name}</h1>
                  <p className="clinic-address">{clinic.address}</p>
                </div>
              </div>
              <div className="clinic-booking-btn">
                <Link
                  className="orange-btn"
                  onClick={onChosseSpecialty}
                  to={""}
                >
                  Chọn chuyên khoa
                </Link>
              </div>
            </div>
          </div>
          <ul className="clinic-menu">
            <li className="clinic-menu-item">
              <a href="#gioithieu">Giới thiệu</a>
            </li>
            <li className="clinic-menu-item">
              <a href="#themanh">Thế mạnh</a>
            </li>
            <li className="clinic-menu-item">
              <a href="#trangthietbi">Trang thiết bị</a>
            </li>
            <li className="clinic-menu-item">
              <a href="#quytrinh">Quy trình khám</a>
            </li>
          </ul>
        </div>
        <div className="clinic-main-content">
          <div className="container">
            <div className="clinic-card clinic-notify">
              <p>
                DoctorCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu
                Việt Nam kết nối người dùng với trên 150 bệnh viện - phòng khám
                uy tín, hơn 1,000 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ,
                sản phẩm y tế chất lượng cao.
              </p>
            </div>
            <div className="clinic-card clinic-ad">
              <p style={{ textAlign: "justify" }}>
                Từ nay, người bệnh có thể đặt lịch tại Khu khám bệnh theo yêu
                cầu, Bệnh viện Hữu nghị Việt Đức thông qua hệ thống đặt khám
                DoctorCare.
              </p>
              <ul style={{ textAlign: "justify" }}>
                <li style={{ textAlign: "justify" }}>
                  Được lựa chọn các giáo sư, tiến sĩ, bác sĩ chuyên khoa giàu
                  kinh nghiệm
                </li>
                <li style={{ textAlign: "justify" }}>
                  Hỗ trợ đặt khám trực tuyến trước khi đi khám&nbsp;(miễn phí
                  đặt lịch)&nbsp;
                </li>
                <li style={{ textAlign: "justify" }}>
                  Giảm thời gian chờ đợi khi làm thủ tục khám và ưu tiên khám
                  trước
                </li>
                <li style={{ textAlign: "justify" }}>
                  Nhận được hướng dẫn chi tiết sau khi đặt lịch
                </li>
              </ul>
            </div>
            {specialtySelected && specialtySelected.doctors.length > 0 && (
              <div className="clinic_makeAppoinment">
                <div className="clinic-main-content-title">
                  <h2>Chuyên khoa {specialtySelected.name}</h2>
                </div>
                {specialtySelected.doctors.map((doctor) => (
                  <DoctorCardAppointment key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
            <div id="gioithieu">
              <div className="clinic-main-content-title">
                <h2>Giới thiệu</h2>
              </div>
              <div className="clinic-main-content-detail">
                <p className="western" style={{ textAlign: "justify" }}>
                  <strong>Địa chỉ:&nbsp;&nbsp;</strong>Bệnh viện có nhiều cổng,
                  bệnh nhân đến khám sẽ đến cổng:<strong>&nbsp;</strong>
                </p>
                <ul style={{ textAlign: "justify" }}>
                  <li className="western" style={{ textAlign: "left" }}>
                    Số 16 - 18 Phủ Doãn, Hoàn Kiếm, Hà Nội
                  </li>
                </ul>
                <p style={{ textAlign: "justify" }}>
                  <strong>Thời gian làm việc:&nbsp;</strong>Thứ 2 đến thứ 7
                </p>
                <ul style={{ textAlign: "justify" }}>
                  <li style={{ textAlign: "justify" }}>Sáng: 7h00 - 12h00</li>
                  <li>Chiều: 13h30 - 16h30</li>
                </ul>
                <p className="western" style={{ textAlign: "justify" }}>
                  Bệnh viện Việt Đức là một trong 5 bệnh viện tuyến Trung ương,
                  hạng đặc biệt của Việt Nam. Bệnh viện có lịch sử trên 100 năm,
                  bề dày truyền thống danh tiếng, là cái nôi của ngành ngoại
                  khoa Việt Nam gắn liền với những thành tựu Y học quan trọng
                  của đất nước.&nbsp;
                </p>
                <p className="western" style={{ textAlign: "justify" }}>
                  Việt Đức là địa chỉ uy tín hàng đầu về ngoại khoa, tiến hành
                  khám bệnh, chữa bệnh và thực hiện các kỹ thuật chụp chiếu, xét
                  nghiệm, thăm dò chức năng cơ bản và chuyên sâu hàng ngày cho
                  người dân.&nbsp;
                </p>
                <p className="western" style={{ textAlign: "justify" }}>
                  Bệnh viện có đội ngũ y bác sĩ hùng hậu, nhiều người kiêm là
                  cán bộ giảng dạy tại Đại học Y khoa Hà Nội hoặc Khoa Y Dược -
                  Đại học Quốc gia Hà Nội. Trong số họ nhiều người là chuyên gia
                  đầu ngành và bác sĩ giàu kinh nghiệm ở các chuyên khoa khác
                  nhau.&nbsp;
                </p>
                <p style={{ textAlign: "justify" }}>
                  <strong>Lưu ý quan trọng</strong>
                </p>
                <ul style={{ textAlign: "justify" }}>
                  <li style={{ textAlign: "justify" }}>
                    Bệnh viện có nhiều khu khám bệnh, do đó để thuận tiện và
                    tiết kiệm thời gian khi đi khám, người bệnh nên tìm hiểu kĩ
                    về vị trí khu khám bệnh của mình trước khi đi khám.
                  </li>
                  <li style={{ textAlign: "justify" }}>
                    Bệnh viện Hữu nghị Việt Đức là bệnh viện chuyên về Ngoại
                    khoa, vì vậy, lịch các bác sĩ thường linh động và ưu tiên
                    khám cho các ca cấp cứu.
                  </li>
                  <li style={{ textAlign: "justify" }}>
                    Người bệnh nên chủ động chuẩn bị một số câu hỏi liên quan
                    đến tình trạng của mình trước khi đi khám để hành trình khám
                    bệnh được hiệu quả hơn.
                  </li>
                </ul>
                <p style={{ textAlign: "justify" }}>
                  <strong>Chi phí khám</strong>
                </p>
                <p style={{ textAlign: "justify" }}>
                  Người bệnh có thể lựa chọn một trong các gói khám sau:
                </p>
                <ol>
                  <li style={{ textAlign: "justify" }}>
                    Gói 1:
                    <ul style={{ listStyleType: "disc" }}>
                      <li>
                        Khám Giáo sư, Phó Giáo sư, Tiến sĩ, Bác sĩ Chuyên khoa
                        II - Chi phí 500.000 đồng/lần khám
                      </li>
                      <li>
                        Khám với bác sĩ Trưởng khoa hoặc Phó khoa - Chi phí
                        500.000 đồng/lần khám
                      </li>
                    </ul>
                  </li>
                  <li>
                    Gói 2:
                    <ul style={{ listStyleType: "disc" }}>
                      <li style={{ textAlign: "justify" }}>
                        Khám Thạc sĩ, Bác sĩ Chuyên khoa I - Chi phí: 300.000
                        đồng/lần khám
                      </li>
                    </ul>
                  </li>
                </ol>
              </div>
            </div>
            <div id="themanh">
              <div className="clinic-main-content-title">
                <h2>Thế mạnh chuyên môn</h2>
              </div>
              <div className="clinic-main-content-detail">
                 <p style={{textAlign: 'justify'}}>Bệnh viện Việt Đức là bệnh viện chuyên khoa Ngoại (phẫu thuật),có thế mạnh về khám, điều trị và Phẫu thuật nhiều chuyên khoa. Một số thế mạnh của Bệnh viện Việt Đức là:</p>
                 <ul style={{textAlign: 'justify'}}>
                  <li style={{textAlign: 'justify'}}>Khám, điều trị, phẫu thuật về Thần kinh</li>
                  <li>Khám, điều trị, phẫu thuật về Cơ xương khớp</li>
                  <li>Khám, điều trị, phẫu thuật về Cột sống</li>
                  <li>Khám, điều trị, phẫu thuật về Tiêu hóa</li>
                  <li>Khám, điều trị, phẫu thuật về Gan mật</li>
                  <li>Khám, điều trị, phẫu thuật về Nam học</li>
                  </ul>
                  <p style={{textAlign: 'justify'}}>Là bệnh viện đi đầu về Phẫu thuật ở nước ta, các bác sĩ đã thực hiện thành công rất nhiều ca phẫu thuật khó.</p>
                  <ul style={{textAlign: 'justify'}}>
                  <li>
                  <strong> Phẫu thuật tim mạch:&nbsp; </strong> 
                  Mổ tim mở được tiến hành thường quy, tiến hành các kỹ thuật tim mạch khó, thay van tim, kỹ thuật Bentall, bắc cầu mạch vành, mổ nối mạch ở tim đang đập.
                  </li>
                  <li style={{textAlign: 'justify'}}><strong>Phẫu thuật Thần kinh:&nbsp;</strong>Mổ chấn thương sọ não, bệnh ở não - tuỷ sống, mổ u tuyến yên qua xoang bướm, mổ u thần kinh VIII qua mê nhĩ có sử dụng dao siêu âm.
                  </li>
                  <li style={{textAlign: 'justify'}}>
                  <strong>Phẫu thuật Nội soi và nội soi can thiệp:&nbsp;</strong>Các loại phẫu thuật nội soi ổ bụng cắt túi mật, cắt u tuyến thượng thận, cắt dây thần kinh X, u nang buồng trứng, cắt lách, cắt ruột thừa bằng nội soi an toàn, tai biến ít, giảm ngày điều trị, phục hồi sau mổ nhanh.</li>
                  <li style={{textAlign: 'justify'}}><strong>Phẫu thuật gan mật tuỵ:&nbsp;</strong>Cắt gan các loại do ung thư, bệnh gan mật và chấn thương; Các phẫu thuật về biến chứng chảy máu do xơ gan - tǎng áp lực tĩnh mạch cửa&nbsp;</li><li style={{textAlign: 'justify'}}><strong>Phẫu thuật Chấn thương chỉnh hình:&nbsp;</strong>Các loại chấn thương, thay khớp háng một bên hay toàn bộ, nội soi khớp.</li><li style={{textAlign: 'justify'}}><strong>Phẫu thuật tiêu hoá:&nbsp;</strong>Các kỹ thuật khó phức tạp như cắt bỏ và tạo hình thực quản, cắt khối tá tuỵ, cắt toàn bộ dạ dày, cắt đại tràng các loại.</li></ul><p style={{textAlign: 'justify'}}><strong>Cụ thể, bệnh viện nhận khám các vấn đề về:</strong></p><ul><li style={{textAlign: 'justify'}}>Bệnh lý thần kinh</li><li style={{textAlign: 'justify'}}>Nội - Hồi sức thần kinh</li><li style={{textAlign: 'justify'}}>Bệnh tim mạch và lồng ngực</li><li style={{textAlign: 'justify'}}>Phẫu thuật tim mạch - lồng ngực</li><li style={{textAlign: 'justify'}}>Ngoại nhi và trẻ sơ sinh</li><li style={{textAlign: 'justify'}}>Bệnh lý tiêu hóa</li><li style={{textAlign: 'justify'}}>Phẫu thuật tiêu hóa</li><li style={{textAlign: 'justify'}}>Bệnh cột sống/thoát vị đĩa đệm</li><li style={{textAlign: 'justify'}}>Chi trên và y học&nbsp; thể thao</li><li style={{textAlign: 'justify'}}>Bệnh lý chi dưới</li><li style={{textAlign: 'justify'}}>Khám xương và điều trị ngoại trú</li><li style={{textAlign: 'justify'}}>Phẫu thuật chấn thương chung</li><li style={{textAlign: 'justify'}}>Phẫu thuật tạo hình - hàm mặt - thẩm mỹ</li><li style={{textAlign: 'justify'}}>Phục hồi chức năng</li><li style={{textAlign: 'justify'}}>Nhiễm khuẩn</li><li style={{textAlign: 'justify'}}>Phẫu thuật nhiễm khuẩn</li><li style={{textAlign: 'justify'}}>Bệnh đường tiết niệu</li><li style={{textAlign: 'justify'}}>Bệnh nam học/nam khoa</li><li style={{textAlign: 'justify'}}>Bệnh lý gan mật</li><li style={{textAlign: 'justify'}}>Ung bướu</li><li style={{textAlign: 'justify'}}>Thận lọc máu</li><li style={{textAlign: 'justify'}}>Bệnh lý hậu môn trực tràng</li><li style={{textAlign: 'justify'}}>Trung tâm ghép tạng</li><li style={{textAlign: 'justify'}}>Phòng khám Tai mũi họng</li></ul>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    )
  );
};
