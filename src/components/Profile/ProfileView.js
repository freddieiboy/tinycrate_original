import React, {Component} from 'react';
import ProfileCrate from '../Crates/ProfileCrate';
import CrateTemplate from '../Crates/CrateTemplate';
import Empty from '../Empty';
import CommentList from '../CommentList';
import ProfileCrateList from '../Crates/ProfileCrateList';
import AbsoluteGrid from 'react-absolute-grid';
import { ifStyle } from '../utilities';
import { SettingsIcon } from '../NewCrates/Icons';

class ProfileView extends Component {
  render() {
    let {
      showInventory,
      user,
      onOpen,
      profileButton,
      isMe,
      blockButton,
      isBlocked,
      currentTab,
      ProfileTabs,
      myCollectionTab,
      subscriptionsTab,
      subscriptionData,
      collectionCrateData
    } = this.props;
    const styles = {
      ProfileView: {
        height: '100%'
      },
      homeHeader: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 65,
        padding: '15px 22px 38px 28px'
      },
      profileHeaderContainer: {
        height: '70%'
      },
      statsHeader: {
        backgroundColor: '#F5F8F1',
        maxWidth: '100%',
        height: '58%',
        textAlign: 'center',
        padding: '18px 0'
      },
      profileOptions: {

      },
      profileColSubsSection: {
        padding: '22px'
      },
      activeTab: {
        color: '#8F9393'
      },
      inactiveTab: {
        color: '#D7D9DA'
      },
      settingCrate: {
        marginRight: '10px'
      }
    }
    let emptyState;
    let profileTabContent;

    if (subscriptionData.length == 0) {
      emptyState = <Empty />;
    } else {
      emptyState = '';
    }
    if(currentTab == ProfileTabs.SUBSCRIPTIONS) {
      profileTabContent =
      <AbsoluteGrid items={subscriptionData} displayObject={(<ProfileCrateList onOpen={onOpen} />)} responsive={true} itemHeight={100} itemWidth={92} />
      {emptyState};
    } else if(currentTab == ProfileTabs.MY_COLLECTION) {
      profileTabContent = <CommentList data={collectionCrateData} />;
    }
    return (
      <div className="ProfileView" style={styles.ProfileView}>
        {/*<div className="homeHeader" style={styles.homeHeader}>
          <h5 className="logoType">Back</h5>
          <div className="inventoryAction float-right" onClick={showInventory}>
            <div className="up-label float-right" style={{ color: 'white', padding: '5px 20px 0 0' }}>
              <p style={{color: '#000'}}>X</p>
            </div>
          </div>
        </div>*/}
        <header>
          <div className="profileHeadeContainer center-relative" style={styles.profileHeaderContainer}>
            <div className="profileHeader Grid Grid--fit">
              <div className="Grid-cell Grid--center-content" style={{height: '100%'}}>
                <div className="userAvatar" style={styles.userAvatar}>
                  {/*<ProfileCrate profileImageURL={user.profileImageURL} />*/}
                  <CrateTemplate
                    color={'blue'}
                    crateSize={60}
                    cratePreview={user.profileImageURL}
                    crateType={'profile'}
                    pop={'true'}
                    popType={'2'}
                    shadow={'true'}/>
                </div>
              </div>
              <div className="Grid-cell Grid--center-content user-info-holder">
                <div className="info">
                  <div className="name">{user.name}</div>
                  <div className="name">@{user.username}</div>
                </div>
              </div>
              <div className="Grid-cell Grid--center-content profileOptions" style={styles.profileOptions}>
                <div className="settingCrate" style={styles.settingCrate}
                  onMouseUp={profileButton}
                  onTouchEnd={profileButton}>
                  <CrateTemplate
                    crateSize={60}
                    color={'green'}
                    crateType={isMe ? 'settings' : 'settings-follow'}
                    shadow={'yes'}
                    pop={'true'}
                    popType={'1'}
                    />
                </div>
                {!isMe ?
                  <div className="settingCrate" style={styles.settingCrate}
                    onMouseUp={blockButton}
                    onTouchEnd={blockButton}>
                    <CrateTemplate
                      crateSize={60}
                      color={isBlocked ? 'pink' : 'green'}
                      crateType={isBlocked ? 'settings-unblock' : 'settings-block'}
                      shadow={'yes'}
                      pop={'true'}
                      popType={'1'}
                      />
                  </div>
                  : ''
                }
              </div>
            </div>
          </div>
          <div className="statsHeader center-relative" style={styles.statsHeader}>
            <div className="Grid Grid--fit">
              <div className="Grid-cell Grid--center-content user-info-holder">
                <div className="info">
                  <div className="count ">1</div>
                  <div className="count ">Level</div>
                </div>
              </div>
              <div className="Grid-cell Grid--center-content user-info-holder">
                <div className="info">
                  <div className="count ">{user.unwrappedCount}</div>
                  <div className="count ">Unwrapped</div>
                </div>
              </div>
              <div className="Grid-cell Grid--center-content user-info-holder">
                <div className="info">
                  <div className="count ">{user.giftedCount}</div>
                  <div className="count ">Gifted</div>
                </div>
              </div>
            </div>
          </div>

        </header>

        <div className="profileColSubs container-fluid body-content" style={styles.profileColSubsSection}>

          <div className="Grid Grid--gutters">
            {isMe ?
            <div className="Grid-cell">
              <h5 style={ifStyle(
                  currentTab === ProfileTabs.MY_COLLECTION && styles.activeTab,
                  currentTab !== ProfileTabs.MY_COLLECTION && styles.inactiveTab
                )}
                onClick={myCollectionTab}>
                <span style={{cursor: 'pointer'}}>My Collection</span>
              </h5>
              {isMe}
            </div>
            : ''
            }
            <div className="Grid-cell">
              <h5 style={ifStyle(
                  currentTab === ProfileTabs.SUBSCRIPTIONS && styles.activeTab,
                  currentTab !== ProfileTabs.SUBSCRIPTIONS && styles.inactiveTab
                )}
                onClick={subscriptionsTab}>
                <span style={{cursor: 'pointer'}}>Subscriptions</span>
              </h5>
            </div>
          </div>

          {profileTabContent}

        </div>
      </div>
    );
  }
}

export default ProfileView;