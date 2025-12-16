import { serializeBaseUrls } from './networking/baseUrls';
import { deserializeBaseUrls } from './networking/baseUrls';
import { FetchOptionsInput } from './networking/fetchOptions';
import { BaseUrlsInput } from './networking/baseUrls';
import { AuthorizationManager } from './managers/authorization';
import { FilesManager } from './managers/files';
import { TrashedFilesManager } from './managers/trashedFiles';
import { AppItemAssociationsManager } from './managers/appItemAssociations';
import { DownloadsManager } from './managers/downloads';
import { UploadsManager } from './managers/uploads';
import { ChunkedUploadsManager } from './managers/chunkedUploads';
import { ListCollaborationsManager } from './managers/listCollaborations';
import { CommentsManager } from './managers/comments';
import { TasksManager } from './managers/tasks';
import { FileVersionsManager } from './managers/fileVersions';
import { FileMetadataManager } from './managers/fileMetadata';
import { FileClassificationsManager } from './managers/fileClassifications';
import { SkillsManager } from './managers/skills';
import { FileWatermarksManager } from './managers/fileWatermarks';
import { FileRequestsManager } from './managers/fileRequests';
import { FoldersManager } from './managers/folders';
import { TrashedFoldersManager } from './managers/trashedFolders';
import { FolderMetadataManager } from './managers/folderMetadata';
import { FolderClassificationsManager } from './managers/folderClassifications';
import { TrashedItemsManager } from './managers/trashedItems';
import { FolderWatermarksManager } from './managers/folderWatermarks';
import { FolderLocksManager } from './managers/folderLocks';
import { MetadataTemplatesManager } from './managers/metadataTemplates';
import { ClassificationsManager } from './managers/classifications';
import { MetadataCascadePoliciesManager } from './managers/metadataCascadePolicies';
import { SearchManager } from './managers/search';
import { UserCollaborationsManager } from './managers/userCollaborations';
import { TaskAssignmentsManager } from './managers/taskAssignments';
import { SharedLinksFilesManager } from './managers/sharedLinksFiles';
import { SharedLinksFoldersManager } from './managers/sharedLinksFolders';
import { WebLinksManager } from './managers/webLinks';
import { TrashedWebLinksManager } from './managers/trashedWebLinks';
import { SharedLinksWebLinksManager } from './managers/sharedLinksWebLinks';
import { SharedLinksAppItemsManager } from './managers/sharedLinksAppItems';
import { UsersManager } from './managers/users';
import { SessionTerminationManager } from './managers/sessionTermination';
import { AvatarsManager } from './managers/avatars';
import { TransferManager } from './managers/transfer';
import { EmailAliasesManager } from './managers/emailAliases';
import { MembershipsManager } from './managers/memberships';
import { InvitesManager } from './managers/invites';
import { GroupsManager } from './managers/groups';
import { WebhooksManager } from './managers/webhooks';
import { EventsManager } from './managers/events';
import { CollectionsManager } from './managers/collections';
import { RecentItemsManager } from './managers/recentItems';
import { RetentionPoliciesManager } from './managers/retentionPolicies';
import { RetentionPolicyAssignmentsManager } from './managers/retentionPolicyAssignments';
import { LegalHoldPoliciesManager } from './managers/legalHoldPolicies';
import { LegalHoldPolicyAssignmentsManager } from './managers/legalHoldPolicyAssignments';
import { FileVersionRetentionsManager } from './managers/fileVersionRetentions';
import { FileVersionLegalHoldsManager } from './managers/fileVersionLegalHolds';
import { ShieldInformationBarriersManager } from './managers/shieldInformationBarriers';
import { ShieldInformationBarrierReportsManager } from './managers/shieldInformationBarrierReports';
import { ShieldInformationBarrierSegmentsManager } from './managers/shieldInformationBarrierSegments';
import { ShieldInformationBarrierSegmentMembersManager } from './managers/shieldInformationBarrierSegmentMembers';
import { ShieldInformationBarrierSegmentRestrictionsManager } from './managers/shieldInformationBarrierSegmentRestrictions';
import { DevicePinnersManager } from './managers/devicePinners';
import { TermsOfServicesManager } from './managers/termsOfServices';
import { TermsOfServiceUserStatusesManager } from './managers/termsOfServiceUserStatuses';
import { CollaborationAllowlistEntriesManager } from './managers/collaborationAllowlistEntries';
import { CollaborationAllowlistExemptTargetsManager } from './managers/collaborationAllowlistExemptTargets';
import { StoragePoliciesManager } from './managers/storagePolicies';
import { StoragePolicyAssignmentsManager } from './managers/storagePolicyAssignments';
import { ZipDownloadsManager } from './managers/zipDownloads';
import { SignRequestsManager } from './managers/signRequests';
import { WorkflowsManager } from './managers/workflows';
import { SignTemplatesManager } from './managers/signTemplates';
import { IntegrationMappingsManager } from './managers/integrationMappings';
import { AiManager } from './managers/ai';
import { AiStudioManager } from './managers/aiStudio';
import { MetadataTaxonomiesManager } from './managers/metadataTaxonomies';
import { DocgenTemplateManager } from './managers/docgenTemplate';
import { DocgenManager } from './managers/docgen';
import { EnterpriseConfigurationsManager } from './managers/enterpriseConfigurations';
import { HubsManager } from './managers/hubs';
import { HubCollaborationsManager } from './managers/hubCollaborations';
import { HubItemsManager } from './managers/hubItems';
import { ShieldListsManager } from './managers/shieldLists';
import { ArchivesManager } from './managers/archives';
import { ExternalUsersManager } from './managers/externalUsers';
import { Authentication } from './networking/auth';
import { NetworkSession } from './networking/network';
import { BoxSdkError } from './box/errors';
import { FetchOptions } from './networking/fetchOptions';
import { FetchResponse } from './networking/fetchResponse';
import { BaseUrls } from './networking/baseUrls';
import { ProxyConfig } from './networking/proxyConfig';
import { AgentOptions } from './internal/utils';
import { Interceptor } from './networking/interceptors';
import { SerializedData } from './serialization/json';
import { sdIsEmpty } from './serialization/json';
import { sdIsBoolean } from './serialization/json';
import { sdIsNumber } from './serialization/json';
import { sdIsString } from './serialization/json';
import { sdIsList } from './serialization/json';
import { sdIsMap } from './serialization/json';
export class BoxClient {
  readonly auth!: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({
    baseUrls: new BaseUrls({}),
  });
  readonly authorization: AuthorizationManager;
  readonly files: FilesManager;
  readonly trashedFiles: TrashedFilesManager;
  readonly appItemAssociations: AppItemAssociationsManager;
  readonly downloads: DownloadsManager;
  readonly uploads: UploadsManager;
  readonly chunkedUploads: ChunkedUploadsManager;
  readonly listCollaborations: ListCollaborationsManager;
  readonly comments: CommentsManager;
  readonly tasks: TasksManager;
  readonly fileVersions: FileVersionsManager;
  readonly fileMetadata: FileMetadataManager;
  readonly fileClassifications: FileClassificationsManager;
  readonly skills: SkillsManager;
  readonly fileWatermarks: FileWatermarksManager;
  readonly fileRequests: FileRequestsManager;
  readonly folders: FoldersManager;
  readonly trashedFolders: TrashedFoldersManager;
  readonly folderMetadata: FolderMetadataManager;
  readonly folderClassifications: FolderClassificationsManager;
  readonly trashedItems: TrashedItemsManager;
  readonly folderWatermarks: FolderWatermarksManager;
  readonly folderLocks: FolderLocksManager;
  readonly metadataTemplates: MetadataTemplatesManager;
  readonly classifications: ClassificationsManager;
  readonly metadataCascadePolicies: MetadataCascadePoliciesManager;
  readonly search: SearchManager;
  readonly userCollaborations: UserCollaborationsManager;
  readonly taskAssignments: TaskAssignmentsManager;
  readonly sharedLinksFiles: SharedLinksFilesManager;
  readonly sharedLinksFolders: SharedLinksFoldersManager;
  readonly webLinks: WebLinksManager;
  readonly trashedWebLinks: TrashedWebLinksManager;
  readonly sharedLinksWebLinks: SharedLinksWebLinksManager;
  readonly sharedLinksAppItems: SharedLinksAppItemsManager;
  readonly users: UsersManager;
  readonly sessionTermination: SessionTerminationManager;
  readonly avatars: AvatarsManager;
  readonly transfer: TransferManager;
  readonly emailAliases: EmailAliasesManager;
  readonly memberships: MembershipsManager;
  readonly invites: InvitesManager;
  readonly groups: GroupsManager;
  readonly webhooks: WebhooksManager;
  readonly events: EventsManager;
  readonly collections: CollectionsManager;
  readonly recentItems: RecentItemsManager;
  readonly retentionPolicies: RetentionPoliciesManager;
  readonly retentionPolicyAssignments: RetentionPolicyAssignmentsManager;
  readonly legalHoldPolicies: LegalHoldPoliciesManager;
  readonly legalHoldPolicyAssignments: LegalHoldPolicyAssignmentsManager;
  readonly fileVersionRetentions: FileVersionRetentionsManager;
  readonly fileVersionLegalHolds: FileVersionLegalHoldsManager;
  readonly shieldInformationBarriers: ShieldInformationBarriersManager;
  readonly shieldInformationBarrierReports: ShieldInformationBarrierReportsManager;
  readonly shieldInformationBarrierSegments: ShieldInformationBarrierSegmentsManager;
  readonly shieldInformationBarrierSegmentMembers: ShieldInformationBarrierSegmentMembersManager;
  readonly shieldInformationBarrierSegmentRestrictions: ShieldInformationBarrierSegmentRestrictionsManager;
  readonly devicePinners: DevicePinnersManager;
  readonly termsOfServices: TermsOfServicesManager;
  readonly termsOfServiceUserStatuses: TermsOfServiceUserStatusesManager;
  readonly collaborationAllowlistEntries: CollaborationAllowlistEntriesManager;
  readonly collaborationAllowlistExemptTargets: CollaborationAllowlistExemptTargetsManager;
  readonly storagePolicies: StoragePoliciesManager;
  readonly storagePolicyAssignments: StoragePolicyAssignmentsManager;
  readonly zipDownloads: ZipDownloadsManager;
  readonly signRequests: SignRequestsManager;
  readonly workflows: WorkflowsManager;
  readonly signTemplates: SignTemplatesManager;
  readonly integrationMappings: IntegrationMappingsManager;
  readonly ai: AiManager;
  readonly aiStudio: AiStudioManager;
  readonly metadataTaxonomies: MetadataTaxonomiesManager;
  readonly docgenTemplate: DocgenTemplateManager;
  readonly docgen: DocgenManager;
  readonly enterpriseConfigurations: EnterpriseConfigurationsManager;
  readonly hubs: HubsManager;
  readonly hubCollaborations: HubCollaborationsManager;
  readonly hubItems: HubItemsManager;
  readonly shieldLists: ShieldListsManager;
  readonly archives: ArchivesManager;
  readonly externalUsers: ExternalUsersManager;
  constructor(
    fields: Omit<
      BoxClient,
      | 'authorization'
      | 'files'
      | 'trashedFiles'
      | 'appItemAssociations'
      | 'downloads'
      | 'uploads'
      | 'chunkedUploads'
      | 'listCollaborations'
      | 'comments'
      | 'tasks'
      | 'fileVersions'
      | 'fileMetadata'
      | 'fileClassifications'
      | 'skills'
      | 'fileWatermarks'
      | 'fileRequests'
      | 'folders'
      | 'trashedFolders'
      | 'folderMetadata'
      | 'folderClassifications'
      | 'trashedItems'
      | 'folderWatermarks'
      | 'folderLocks'
      | 'metadataTemplates'
      | 'classifications'
      | 'metadataCascadePolicies'
      | 'search'
      | 'userCollaborations'
      | 'taskAssignments'
      | 'sharedLinksFiles'
      | 'sharedLinksFolders'
      | 'webLinks'
      | 'trashedWebLinks'
      | 'sharedLinksWebLinks'
      | 'sharedLinksAppItems'
      | 'users'
      | 'sessionTermination'
      | 'avatars'
      | 'transfer'
      | 'emailAliases'
      | 'memberships'
      | 'invites'
      | 'groups'
      | 'webhooks'
      | 'events'
      | 'collections'
      | 'recentItems'
      | 'retentionPolicies'
      | 'retentionPolicyAssignments'
      | 'legalHoldPolicies'
      | 'legalHoldPolicyAssignments'
      | 'fileVersionRetentions'
      | 'fileVersionLegalHolds'
      | 'shieldInformationBarriers'
      | 'shieldInformationBarrierReports'
      | 'shieldInformationBarrierSegments'
      | 'shieldInformationBarrierSegmentMembers'
      | 'shieldInformationBarrierSegmentRestrictions'
      | 'devicePinners'
      | 'termsOfServices'
      | 'termsOfServiceUserStatuses'
      | 'collaborationAllowlistEntries'
      | 'collaborationAllowlistExemptTargets'
      | 'storagePolicies'
      | 'storagePolicyAssignments'
      | 'zipDownloads'
      | 'signRequests'
      | 'workflows'
      | 'signTemplates'
      | 'integrationMappings'
      | 'ai'
      | 'aiStudio'
      | 'metadataTaxonomies'
      | 'docgenTemplate'
      | 'docgen'
      | 'enterpriseConfigurations'
      | 'hubs'
      | 'hubCollaborations'
      | 'hubItems'
      | 'shieldLists'
      | 'archives'
      | 'externalUsers'
      | 'networkSession'
      | 'makeRequest'
      | 'withAsUserHeader'
      | 'withSuppressedNotifications'
      | 'withExtraHeaders'
      | 'withCustomBaseUrls'
      | 'withProxy'
      | 'withCustomAgentOptions'
      | 'withInterceptors'
    > &
      Partial<Pick<BoxClient, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
    this.authorization = new AuthorizationManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.files = new FilesManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.trashedFiles = new TrashedFilesManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.appItemAssociations = new AppItemAssociationsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.downloads = new DownloadsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.uploads = new UploadsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.chunkedUploads = new ChunkedUploadsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.listCollaborations = new ListCollaborationsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.comments = new CommentsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.tasks = new TasksManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.fileVersions = new FileVersionsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.fileMetadata = new FileMetadataManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.fileClassifications = new FileClassificationsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.skills = new SkillsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.fileWatermarks = new FileWatermarksManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.fileRequests = new FileRequestsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.folders = new FoldersManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.trashedFolders = new TrashedFoldersManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.folderMetadata = new FolderMetadataManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.folderClassifications = new FolderClassificationsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.trashedItems = new TrashedItemsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.folderWatermarks = new FolderWatermarksManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.folderLocks = new FolderLocksManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.metadataTemplates = new MetadataTemplatesManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.classifications = new ClassificationsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.metadataCascadePolicies = new MetadataCascadePoliciesManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.search = new SearchManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.userCollaborations = new UserCollaborationsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.taskAssignments = new TaskAssignmentsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.sharedLinksFiles = new SharedLinksFilesManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.sharedLinksFolders = new SharedLinksFoldersManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.webLinks = new WebLinksManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.trashedWebLinks = new TrashedWebLinksManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.sharedLinksWebLinks = new SharedLinksWebLinksManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.sharedLinksAppItems = new SharedLinksAppItemsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.users = new UsersManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.sessionTermination = new SessionTerminationManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.avatars = new AvatarsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.transfer = new TransferManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.emailAliases = new EmailAliasesManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.memberships = new MembershipsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.invites = new InvitesManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.groups = new GroupsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.webhooks = new WebhooksManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.events = new EventsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.collections = new CollectionsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.recentItems = new RecentItemsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.retentionPolicies = new RetentionPoliciesManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.retentionPolicyAssignments = new RetentionPolicyAssignmentsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.legalHoldPolicies = new LegalHoldPoliciesManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.legalHoldPolicyAssignments = new LegalHoldPolicyAssignmentsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.fileVersionRetentions = new FileVersionRetentionsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.fileVersionLegalHolds = new FileVersionLegalHoldsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.shieldInformationBarriers = new ShieldInformationBarriersManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.shieldInformationBarrierReports =
      new ShieldInformationBarrierReportsManager({
        auth: this.auth,
        networkSession: this.networkSession,
      });
    this.shieldInformationBarrierSegments =
      new ShieldInformationBarrierSegmentsManager({
        auth: this.auth,
        networkSession: this.networkSession,
      });
    this.shieldInformationBarrierSegmentMembers =
      new ShieldInformationBarrierSegmentMembersManager({
        auth: this.auth,
        networkSession: this.networkSession,
      });
    this.shieldInformationBarrierSegmentRestrictions =
      new ShieldInformationBarrierSegmentRestrictionsManager({
        auth: this.auth,
        networkSession: this.networkSession,
      });
    this.devicePinners = new DevicePinnersManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.termsOfServices = new TermsOfServicesManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.termsOfServiceUserStatuses = new TermsOfServiceUserStatusesManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.collaborationAllowlistEntries =
      new CollaborationAllowlistEntriesManager({
        auth: this.auth,
        networkSession: this.networkSession,
      });
    this.collaborationAllowlistExemptTargets =
      new CollaborationAllowlistExemptTargetsManager({
        auth: this.auth,
        networkSession: this.networkSession,
      });
    this.storagePolicies = new StoragePoliciesManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.storagePolicyAssignments = new StoragePolicyAssignmentsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.zipDownloads = new ZipDownloadsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.signRequests = new SignRequestsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.workflows = new WorkflowsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.signTemplates = new SignTemplatesManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.integrationMappings = new IntegrationMappingsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.ai = new AiManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.aiStudio = new AiStudioManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.metadataTaxonomies = new MetadataTaxonomiesManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.docgenTemplate = new DocgenTemplateManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.docgen = new DocgenManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.enterpriseConfigurations = new EnterpriseConfigurationsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.hubs = new HubsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.hubCollaborations = new HubCollaborationsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.hubItems = new HubItemsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.shieldLists = new ShieldListsManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.archives = new ArchivesManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
    this.externalUsers = new ExternalUsersManager({
      auth: this.auth,
      networkSession: this.networkSession,
    });
  }
  /**
   * Make a custom http request using the client authentication and network session.
   * @param {FetchOptionsInput} fetchOptionsInput Options to be passed to the fetch call
   * @returns {Promise<FetchResponse>}
   */
  async makeRequest(
    fetchOptionsInput: FetchOptionsInput,
  ): Promise<FetchResponse> {
    const fetchOptions: FetchOptions = new FetchOptions({
      url: fetchOptionsInput.url,
      method: fetchOptionsInput.method,
      params: fetchOptionsInput.params,
      headers: fetchOptionsInput.headers,
      data: fetchOptionsInput.data,
      fileStream: fetchOptionsInput.fileStream,
      multipartData: fetchOptionsInput.multipartData,
      contentType: fetchOptionsInput.contentType,
      responseFormat: fetchOptionsInput.responseFormat,
      auth: fetchOptionsInput.auth,
      networkSession: fetchOptionsInput.networkSession,
      cancellationToken: fetchOptionsInput.cancellationToken,
      followRedirects: fetchOptionsInput.followRedirects,
    });
    const auth: Authentication =
      fetchOptions.auth == void 0 ? this.auth : fetchOptions.auth!;
    const networkSession: NetworkSession =
      fetchOptions.networkSession == void 0
        ? this.networkSession
        : fetchOptions.networkSession!;
    const enrichedFetchOptions: FetchOptions = new FetchOptions({
      auth: auth,
      networkSession: networkSession,
      url: fetchOptions.url,
      method: fetchOptions.method,
      params: fetchOptions.params,
      headers: fetchOptions.headers,
      data: fetchOptions.data,
      fileStream: fetchOptions.fileStream,
      multipartData: fetchOptions.multipartData,
      contentType: fetchOptions.contentType,
      responseFormat: fetchOptions.responseFormat,
      followRedirects: fetchOptions.followRedirects,
    });
    return await networkSession.networkClient.fetch(enrichedFetchOptions);
  }
  /**
   * Create a new client to impersonate user with the provided ID. All calls made with the new client will be made in context of the impersonated user, leaving the original client unmodified.
   * @param {string} userId ID of an user to impersonate
   * @returns {BoxClient}
   */
  withAsUserHeader(userId: string): BoxClient {
    return new BoxClient({
      auth: this.auth,
      networkSession: this.networkSession.withAdditionalHeaders({
        ['As-User']: userId,
      }),
    });
  }
  /**
   * Create a new client with suppressed notifications. Calls made with the new client will not trigger email or webhook notifications
   * @returns {BoxClient}
   */
  withSuppressedNotifications(): BoxClient {
    return new BoxClient({
      auth: this.auth,
      networkSession: this.networkSession.withAdditionalHeaders({
        ['Box-Notifications']: 'off',
      }),
    });
  }
  /**
     * Create a new client with a custom set of headers that will be included in every API call
     * @param {{
        readonly [key: string]: string;
    }} extraHeaders Custom set of headers that will be included in every API call
     * @returns {BoxClient}
     */
  withExtraHeaders(
    extraHeaders: {
      readonly [key: string]: string;
    } = {},
  ): BoxClient {
    return new BoxClient({
      auth: this.auth,
      networkSession: this.networkSession.withAdditionalHeaders(extraHeaders),
    });
  }
  /**
   * Create a new client with a custom set of base urls that will be used for every API call
   * @param {BaseUrlsInput} baseUrlsInput Custom set of base urls that will be used for every API call
   * @returns {BoxClient}
   */
  withCustomBaseUrls(baseUrlsInput: BaseUrlsInput): BoxClient {
    const baseUrls: BaseUrls = new BaseUrls({
      baseUrl: baseUrlsInput.baseUrl,
      uploadUrl: baseUrlsInput.uploadUrl,
      oauth2Url: baseUrlsInput.oauth2Url,
    });
    return new BoxClient({
      auth: this.auth,
      networkSession: this.networkSession.withCustomBaseUrls(baseUrls),
    });
  }
  /**
   * Create a new client with a custom proxy that will be used for every API call
   * @param {ProxyConfig} config
   * @returns {BoxClient}
   */
  withProxy(config: ProxyConfig): BoxClient {
    return new BoxClient({
      auth: this.auth,
      networkSession: this.networkSession.withProxy(config),
    });
  }
  /**
   * Create a new client with a custom set of agent options that will be used for every API call
   * @param {AgentOptions} agentOptions Custom set of agent options that will be used for every API call
   * @returns {BoxClient}
   */
  withCustomAgentOptions(agentOptions: AgentOptions): BoxClient {
    return new BoxClient({
      auth: this.auth,
      networkSession: this.networkSession.withCustomAgentOptions(agentOptions),
    });
  }
  /**
   * Create a new client with a custom set of interceptors that will be used for every API call
   * @param {readonly Interceptor[]} interceptors Custom set of interceptors that will be used for every API call
   * @returns {BoxClient}
   */
  withInterceptors(interceptors: readonly Interceptor[]): BoxClient {
    return new BoxClient({
      auth: this.auth,
      networkSession: this.networkSession.withInterceptors(interceptors),
    });
  }
}
export interface BoxClientInput {
  readonly auth: Authentication;
  readonly networkSession?: NetworkSession;
}
