import { Box } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import { useGlobals } from "../../hooks/useGlobals";
import { useState } from "react";
import { MemberUpdateInput } from "../../../lib/types/member";
import { T } from "../../../lib/types/common";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { Messages, serverApi } from "../../../lib/config";
import MemberService from "../../services/MemberService";

export function Settings() {
  const { authMember, setAuthMember } = useGlobals();
  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage
      ? `${serverApi}/${authMember.memberImage}`
      : "/icons/default-user.svg"
  );
  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(
    {
      memberNick: authMember?.memberNick,
      memberPhone: authMember?.memberPhone,
      memberAddress: authMember?.memberAddress,
      memberDesc: authMember?.memberDesc,
      memberImage: authMember?.memberImage,
    }
  );

  /** HANDLERS **/

  const memberNickHandler = (e: T) => {
    memberUpdateInput.memberNick = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberPhoneHandler = (e: T) => {
    memberUpdateInput.memberPhone = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberAddressHandler = (e: T) => {
    memberUpdateInput.memberAddress = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberDescriptionHandler = (e: T) => {
    memberUpdateInput.memberDesc = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const handleSubmitButton = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (
        memberUpdateInput.memberNick === "" ||
        memberUpdateInput.memberPhone === "" ||
        memberUpdateInput.memberAddress === "" ||
        memberUpdateInput.memberDesc === ""
      ) {
        throw new Error(Messages.error3);
      }

      const member = new MemberService();
      const result = await member.updateMember(memberUpdateInput);
      setAuthMember(result);

      await sweetTopSmallSuccessAlert("Modified successfully!", 700);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handleImageViewer = (e: T) => {
    const file = e.target.files[0];
    console.log("file:", file);
    const fileType = file.type,
      validateImageTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (!validateImageTypes.includes(fileType)) {
      sweetErrorHandling(Messages.error5).then();
    } else {
      if (file) {
        memberUpdateInput.memberImage = file;
        setMemberUpdateInput({ ...memberUpdateInput });
        setMemberImage(URL.createObjectURL(file));
      }
    }
  };

  return (
    <>
      <div className="dashboard_content">
        <div className="dashboard_body">
          <div className="dash_personal_info">
            <div className="dash_personal_info_edit comment_input p-0 mb_0">
              <form>
                <div className="row">
                  <Box className={"member-media-frame"}>
                    <img src={memberImage} className={"mb-image"} />
                    <div className={"media-change-box"}>
                      <span>Upload image</span>
                      <p>JPG, JPEG, PNG formats only!</p>
                      <div className={"up-del-box"}>
                        <Button component="label" onChange={handleImageViewer}>
                          <CloudDownloadIcon />
                          <input type="file" hidden />
                        </Button>
                      </div>
                    </div>
                  </Box>
                  <div className="col-12">
                    <div className="comment_imput_single">
                      <label>Username</label>
                      <input
                        className={"spec-input mb-nick"}
                        type="text"
                        placeholder={authMember?.memberNick}
                        value={memberUpdateInput.memberNick}
                        name="memberNick"
                        onChange={memberNickHandler}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6">
                    <div className="comment_imput_single">
                      <label>Phone</label>
                      <input
                        className={"spec-input mb-phone"}
                        type="text"
                        placeholder={authMember?.memberPhone ?? "no phone"}
                        value={memberUpdateInput.memberPhone}
                        name="memberPhone"
                        onChange={memberPhoneHandler}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6">
                    <div className="comment_imput_single">
                      <label>Address</label>
                      <input
                        className={"spec-input  mb-address"}
                        type="text"
                        placeholder={
                          authMember?.memberAddress
                            ? authMember.memberAddress
                            : "no address"
                        }
                        value={memberUpdateInput.memberAddress}
                        name="memberAddress"
                        onChange={memberAddressHandler}
                      />
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="comment_imput_single">
                      <label>Description</label>
                      <textarea
                        className={"spec-textarea mb-description"}
                        placeholder={
                          authMember?.memberDesc
                            ? authMember.memberDesc
                            : "no description"
                        }
                        value={memberUpdateInput.memberDesc}
                        name="memberDesc"
                        onChange={memberDescriptionHandler}
                      />
                    </div>
                    <button
                      type="button"
                      className="common_btn"
                      onClick={handleSubmitButton}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
